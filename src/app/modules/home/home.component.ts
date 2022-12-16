import { Component, ViewEncapsulation } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
    periods: Array<any>;
    interval: string;
    startIssues: DateTime;
    endIssues: DateTime;
    /**
     * Constructor
     */
    constructor() {
    }

    changePeriod(periods: any) {
        this.periods = periods.periods;
        this.interval = periods.interval;
        this.startIssues = DateTime.fromISO(this.periods[0].start);
        this.endIssues = DateTime.fromISO(this.periods[this.periods.length - 1].end);
    }
}
