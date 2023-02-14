import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'service-desk', loadChildren: () => import('./modules/service-desk/service-desk.module').then(m => m.ServiceDeskModule) },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'contributions', loadChildren: () => import('./modules/contributions/contributions.module').then(m => m.ContributionsModule) },
    ]
  }

];
