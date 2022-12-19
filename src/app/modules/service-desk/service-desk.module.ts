import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ServiceDeskComponent } from '../service-desk/service-desk.component';
import { CommonModule } from '@angular/common';
import { PeriodModule } from '../../components/period/period.module';
import { IssuesModule } from '../../components/issues/issues.module';
import { HistoryGraphModule } from '../../components/history-graph/history-graph.module';
import { ByuserGraphModule } from '../../components/byuser-graph/byuser-graph.module';

const routes: Route[] = [
  {
    path: '',
    component: ServiceDeskComponent
  }
];

@NgModule({
  declarations: [
    ServiceDeskComponent
  ],
  imports: [
    CommonModule,
    ByuserGraphModule,
    HistoryGraphModule,
    PeriodModule,
    IssuesModule,
    RouterModule.forChild(routes),
  ]
})
export class ServiceDeskModule {
}
