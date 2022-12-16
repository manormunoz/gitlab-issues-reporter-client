import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeriodComponent } from './period.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        PeriodComponent,
    ],
    imports: [
        CommonModule,
        MatButtonToggleModule,
      MatCardModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        PeriodComponent,
    ]

})
export class PeriodModule {
}
