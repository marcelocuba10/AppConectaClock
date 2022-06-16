import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'day',
    loadChildren: () => import('./pages/day/day.module').then( m => m.DayPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'materials',
    loadChildren: () => import('./pages/materials/materials.module').then( m => m.MaterialsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./pages/order-detail/order-detail.module').then( m => m.OrderDetailPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'new-order',
    loadChildren: () => import('./pages/new-order/new-order.module').then( m => m.NewOrderPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'new-material',
    loadChildren: () => import('./pages/new-material/new-material.module').then( m => m.NewMaterialPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/report/report.module').then( m => m.ReportPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
