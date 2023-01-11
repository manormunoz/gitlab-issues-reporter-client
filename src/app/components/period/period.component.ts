import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateTime, Interval } from 'luxon';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {
  @Output() public change: EventEmitter<any> = new EventEmitter<any>();

  period = 'last-15-days';
  interval: any = 'days';
  constructor() {
  }

  ngOnInit(): void {
    this.onChange();
  }
  public onChange() {
    let start;
    let end;
    switch (this.period) {
      case 'last-year':
        start = DateTime.now().minus({ years: 1 }).startOf('year');
        end = DateTime.now().minus({ years: 1 }).endOf('year');
        break;
      case 'current-year':
        start = DateTime.now().startOf('year');
        end = DateTime.now().endOf('year');
        break;
      case 'last-quarter':
        start = DateTime.now().minus({ quarters: 1 }).startOf('quarter');
        end = DateTime.now().minus({ quarters: 1 }).endOf('quarter');
        break;
      case 'current-quarter':
        start = DateTime.now().startOf('quarter');
        end = DateTime.now().endOf('quarter');
        break;
      case 'last-month':
        start = DateTime.now().minus({ months: 1 }).startOf('month');
        end = DateTime.now().minus({ months: 1 }).endOf('month');
        break;
      case 'last-30-days':
        start = DateTime.now().minus({ months: 1 }).startOf('day');
        end = DateTime.now().endOf('day');
        break;
      case 'last-15-days':
        start = DateTime.now().minus({ days: 15 }).startOf('day');
        end = DateTime.now().endOf('day');
        break;
      default:
        start = DateTime.now().minus({ months: 1 }).startOf('day');
        end = DateTime.now().endOf('day');
        break;
    }

    const interval = Interval.fromDateTimes(start, end);
    const periods = [];
    for (let i = 0; i <= Math.floor(interval.length(this.interval)); i++) {
      const startDay = start.plus({ [this.interval]: i }).startOf(this.interval);
      const endDay = start.plus({ [this.interval]: i }).endOf(this.interval);
      // console.log(i, startDay.toISO(), endDay.toISO());
      periods.push({
        start: startDay.toISO(),
        end: endDay.toISO(),
      });
    }
    this.change.emit({ interval: this.interval, periods });
  }
}
