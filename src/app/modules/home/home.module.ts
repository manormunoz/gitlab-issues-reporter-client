import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { PeriodModule } from '../../components/period/period.module';
import { IssuesModule } from '../../components/issues/issues.module';
import { HistoryGraphModule } from '../../components/history-graph/history-graph.module';

const routes: Route[] = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HistoryGraphModule,
        PeriodModule,
        IssuesModule,
        RouterModule.forChild(routes),
    ]
})
export class HomeModule {
}
