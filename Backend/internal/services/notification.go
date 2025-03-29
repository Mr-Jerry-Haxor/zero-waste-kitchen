package services

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"
	"zero-waste-kitchen/internal/models"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/messaging"
	"google.golang.org/api/option"
)

var (
	fcmClient *messaging.Client
)

func InitializeFirebase() error {
	ctx := context.Background()

	// Use environment variables
	conf := &firebase.Config{
		ProjectID: os.Getenv("FIREBASE_PROJECT_ID"),
	}

	opt := option.WithCredentialsFile("serviceAccountKey.json")

	app, err := firebase.NewApp(ctx, conf, opt)
	if err != nil {
		return fmt.Errorf("error initializing app: %v", err)
	}

	fcmClient, err = app.Messaging(ctx)
	if err != nil {
		return fmt.Errorf("error getting messaging client: %v", err)
	}

	log.Println("Firebase Cloud Messaging initialized successfully")
	return nil
}

func SendExpiryNotification(user models.User, items []models.GroceryItem) {
	if fcmClient == nil {
		log.Println("FCM client not initialized")
		return
	}

	ctx := context.Background()

	if user.FCMToken == "" {
		log.Printf("User %s has no FCM token registered", user.Email)
		return
	}

	// Use time.Until instead of expiryDate.Sub(time.Now())
	daysLeft := int(time.Until(items[0].ExpiryDate).Hours() / 24)
	notificationTitle := fmt.Sprintf("%d items expiring in %d days", len(items), daysLeft)

	message := &messaging.Message{
		Token: user.FCMToken,
		Notification: &messaging.Notification{
			Title: notificationTitle,
			Body:  prepareNotificationBody(items),
		},
		Data: map[string]string{
			"type":    "expiry_alert",
			"count":   fmt.Sprintf("%d", len(items)),
			"details": prepareItemsJSON(items),
		},
		Android: &messaging.AndroidConfig{
			Priority: "high",
		},
		APNS: &messaging.APNSConfig{
			Headers: map[string]string{
				"apns-priority": "10",
			},
		},
	}

	response, err := fcmClient.Send(ctx, message)
	if err != nil {
		log.Printf("Failed to send FCM message: %v", err)
		return
	}

	log.Printf("Successfully sent FCM message: %v", response)
}

func prepareNotificationBody(items []models.GroceryItem) string {
	if len(items) == 1 {
		return fmt.Sprintf("%s is expiring on %s", items[0].Name, items[0].ExpiryDate.Format("Jan 2"))
	}

	itemNames := make([]string, 0, len(items))
	for _, item := range items {
		itemNames = append(itemNames, item.Name)
	}

	return fmt.Sprintf("Items: %s", joinStringsWithAnd(itemNames))
}

func prepareItemsJSON(items []models.GroceryItem) string {
	type simpleItem struct {
		Name       string    `json:"name"`
		ExpiryDate time.Time `json:"expiry_date"`
	}

	var simpleItems []simpleItem
	for _, item := range items {
		simpleItems = append(simpleItems, simpleItem{
			Name:       item.Name,
			ExpiryDate: item.ExpiryDate,
		})
	}

	jsonData, err := json.Marshal(simpleItems)
	if err != nil {
		return "[]"
	}
	return string(jsonData)
}

func joinStringsWithAnd(items []string) string {
	if len(items) == 0 {
		return ""
	}
	if len(items) == 1 {
		return items[0]
	}
	if len(items) == 2 {
		return items[0] + " and " + items[1]
	}

	return items[0] + ", " + joinStringsWithAnd(items[1:])
}
