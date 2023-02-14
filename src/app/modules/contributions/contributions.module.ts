import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ContributionsComponent } from '../contributions/contributions.component';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Route[] = [
  {
    path: '',
    component: ContributionsComponent
  }
];

@NgModule({
  declarations: [
    ContributionsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NgApexchartsModule,
    RouterModule.forChild(routes),
  ]
})
export class ContributionsModule {
}
