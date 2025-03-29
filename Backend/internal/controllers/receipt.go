package controllers

import (
	"net/http"
	"os"
	"path/filepath"
	"time"
	"zero-waste-kitchen/internal/models"
	"zero-waste-kitchen/pkg/database"

	"github.com/gin-gonic/gin"
)

func UploadReceipt(c *gin.Context) {
	userID := c.GetUint("userID")

	file, err := c.FormFile("receipt")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}

	// Create uploads directory if it doesn't exist
	if err := os.MkdirAll("uploads", os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
		return
	}

	// Generate unique filename
	filename := filepath.Join("uploads", time.Now().Format("20060102150405")+"_"+file.Filename)
	if err := c.SaveUploadedFile(file, filename); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	// Process receipt with OCR (mock implementation)
	items, err := processReceipt(filename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process receipt"})
		return
	}

	// Create receipt record
	receipt := models.Receipt{
		UserID:       userID,
		ImagePath:    filename,
		PurchaseDate: time.Now(),
	}

	if err := database.DB.Create(&receipt).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save receipt"})
		return
	}

	// Add items to inventory
	for _, item := range items {
		item.UserID = userID
		item.ReceiptID = &receipt.ID // Assign the receipt ID as a pointer
		if err := database.DB.Create(&item).Error; err != nil {
			continue // Skip items that fail to save
		}
	}

	c.JSON(http.StatusCreated, gin.H{
		"receipt": receipt,
		"items":   items,
	})
}

func GetAllReceipts(c *gin.Context) {
	userID := c.GetUint("userID")

	var receipts []models.Receipt
	if err := database.DB.Preload("Items").Where("user_id = ?", userID).Find(&receipts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch receipts"})
		return
	}

	c.JSON(http.StatusOK, receipts)
}

func GetReceipt(c *gin.Context) {
	userID := c.GetUint("userID")
	id := c.Param("id")

	var receipt models.Receipt
	if err := database.DB.Preload("Items").Where("id = ? AND user_id = ?", id, userID).First(&receipt).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Receipt not found"})
		return
	}

	c.JSON(http.StatusOK, receipt)
}

// processReceipt is a mock implementation of receipt processing
func processReceipt(imagePath string) ([]models.GroceryItem, error) {
	// In a real implementation, this would call an OCR API
	// For now, we'll return mock data
	return []models.GroceryItem{
		{
			Name:            "Milk",
			Quantity:        1,
			Unit:            "L",
			StorageLocation: "refrigerator",
			ManufactureDate: time.Now().AddDate(0, -1, 0), // 1 month ago
			ExpiryDate:      time.Now().AddDate(0, 0, 7),  // 7 days from now
		},
		{
			Name:            "Rice",
			Quantity:        2,
			Unit:            "kg",
			StorageLocation: "dry_pantry",
			ManufactureDate: time.Now().AddDate(0, -3, 0), // 3 months ago
			ExpiryDate:      time.Now().AddDate(1, 0, 0),  // 1 year from now
		},
	}, nil
}
