import { Component, ViewEncapsulation } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
    selector: 'service-desk',
    templateUrl: './service-desk.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ServiceDeskComponent {
    periods: Array<any>;
    interval: string;
    startIssues: DateTime;
    endIssues: DateTime;
    authorId = 1257257;
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
