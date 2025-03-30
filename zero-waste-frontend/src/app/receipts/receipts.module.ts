import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ReceiptListComponent } from './components/receipt-list/receipt-list.component';
import { ReceiptUploadComponent } from './components/receipt-upload/receipt-upload.component';
import { ReceiptDetailComponent } from './components/receipt-detail/receipt-detail.component';
import { AuthGuard } from '../core/guards/auth.guard'; // Import the AuthGuard

const routes: Routes = [
  { path: '', component: ReceiptListComponent, canActivate: [AuthGuard] }, // Protect the route
  { path: 'upload', component: ReceiptUploadComponent },
  { path: ':id', component: ReceiptDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReceiptsModule {}