import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'groceries',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [guestGuard]
  },
  {
    path: 'groceries',
    loadChildren: () => import('./groceries/groceries.module').then(m => m.GroceriesModule),
    canActivate: [authGuard]
  },
  {
    path: 'receipts',
    loadChildren: () => import('./receipts/receipts.module').then(m => m.ReceiptsModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];