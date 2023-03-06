import { NgModule } from '@angular/core';
import { BydeveloperGraphComponent } from './bydeveloper-graph.component';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    BydeveloperGraphComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NgApexchartsModule,
  ],
  exports: [
    BydeveloperGraphComponent,
  ],
})
export class BydeveloperGraphModule {
}
