import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/main',
        pathMatch: 'full'
      },
      {
        path: '/',
        redirectTo: '/tabs/main',
        pathMatch: 'full'
      },
      {
        path: 'qrcode',
        loadChildren: () => import('../pages/qrcode/qrcode.module').then(m => m.QrcodePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'schedules',
        loadChildren: () => import('../pages/schedule/schedule.module').then(m => m.SchedulePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'notifications',
        loadChildren: () => import('../pages/notification/notification.module').then(m => m.NotificationPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'main',
        loadChildren: () => import('../pages/main/main.module').then(m => m.MainPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'scheduleDay',
        loadChildren: () => import('../pages/scheduleDay/scheduleDay.module').then(m => m.scheduleDayPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuard]
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
    path: 'main',
    redirectTo: '/tabs/main',
    pathMatch: 'full'
  },
  {
    path: 'scheduleDay',
    redirectTo: '/tabs/scheduleDay',
    pathMatch: 'full'
  },
  {
    path: 'schedules',
    redirectTo: '/tabs/schedules',
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
export class TabsPageRoutingModule { }
