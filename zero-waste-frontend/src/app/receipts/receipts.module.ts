import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ReceiptListComponent } from './components/receipt-list/receipt-list.component';
import { ReceiptUploadComponent } from './components/receipt-upload/receipt-upload.component';
import { ReceiptDetailComponent } from './components/receipt-detail/receipt-detail.component';
import { ReceiptService } from './services/receipt.service';

@NgModule({
  declarations: [
    ReceiptListComponent,
    ReceiptUploadComponent,
    ReceiptDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ReceiptListComponent },
      { path: 'upload', component: ReceiptUploadComponent },
      { path: ':id', component: ReceiptDetailComponent }
    ])
  ],
  providers: [ReceiptService]
})
export class ReceiptsModule { }