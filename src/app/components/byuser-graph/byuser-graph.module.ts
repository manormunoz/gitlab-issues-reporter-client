import { NgModule } from '@angular/core';
import { ByuserGraphComponent } from './byuser-graph.component';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    ByuserGraphComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NgApexchartsModule,
  ],
  exports: [
    ByuserGraphComponent,
  ],
})
export class ByuserGraphModule {
}
