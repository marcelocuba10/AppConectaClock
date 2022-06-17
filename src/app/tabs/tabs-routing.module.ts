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
        path: 'reports',
        loadChildren: () => import('../pages/report/report.module').then(m => m.ReportPageModule),
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
      },
      {
        path: '',
        redirectTo: '/tabs/main',
        pathMatch: 'full'
      }
    ]
  },
  //Force show tab bottom when url not contain /tabs/
  {
    path: 'main',
    redirectTo: '/tabs/main',
    pathMatch: 'full'
  },
  //on init app, show login page
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'reports',
    redirectTo: '/tabs/reports',
    pathMatch: 'full'
  },
  {
    path: 'order-detail/:id',
    redirectTo: '/tabs/order-detail/:id',
    pathMatch: 'full'
  },
  {
    path: 'new-material/:id',
    redirectTo: '/tabs/new-material/:id',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    redirectTo: '/tabs/orders',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
