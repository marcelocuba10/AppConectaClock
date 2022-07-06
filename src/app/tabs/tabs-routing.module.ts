import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {AuthGuard} from '../guard/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'qrcode',
        loadChildren: () => import('../pages/qrcode/qrcode.module').then(m => m.QrcodePageModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'reports',
        loadChildren: () => import('../pages/report/report.module').then(m => m.ReportPageModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'notifications',
        loadChildren: () => import('../pages/notification/notification.module').then(m => m.NotificationPageModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'main',
        loadChildren: () => import('../pages/main/main.module').then(m => m.MainPageModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule),
        canActivate:[AuthGuard]
      }
    ]
  },
  //on init app, show login page
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'qrcode',
    redirectTo: '/tabs/qrcode',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'main',
    redirectTo: '/tabs/main',
    pathMatch: 'full'
  },
  {
    path: 'reports',
    redirectTo: '/tabs/reports',
    pathMatch: 'full'
  },
  {
    path: 'notifications',
    redirectTo: '/tabs/notifications',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
