import { NgModule } from '@angular/core';
import { HistoryGraphComponent } from './history-graph.component';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
    declarations: [
        HistoryGraphComponent,
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        NgApexchartsModule,
    ],
    exports: [
        HistoryGraphComponent,
    ]

})
export class HistoryGraphModule {
}
