import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { DateTime } from 'luxon';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-history-graph',
  templateUrl: './history-graph.component.html',
  styleUrls: ['./history-graph.component.scss']
})
export class HistoryGraphComponent implements OnInit, OnChanges {

  @Input() periods: Array<any>;
  @Input() interval: string;
  @Input() author_id: number;

  loading = true;
  chart: ApexOptions;

  constructor(private router: Router, private httpService: HttpService) {

  }

  ngOnInit(): void {
    (window as any)['Apex'] = {
      chart: {
        events: {
          mounted: (chart: any, options?: any): void => {
            this._fixSvgFill(chart.el);
          },
          updated: (chart: any, options?: any): void => {
            this._fixSvgFill(chart.el);
          }
        }
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.periods && this.interval) {
      this.change();
    }
  }

  async change($event = null) {
    this.loading = true;
    const petitions = this.periods.map(p => {
      const params: any = {
        ...p,
        author_id: 1257257,
      };
      if (this.author_id) {
        params.author_id = this.author_id;
      }
      return this.httpService.get('/issues_statistics', params);
    });
    //
    const _data = await Promise.all(petitions);
    const all: any[] = [], closed: any[] = [], opened: any[] = [];
    _data.forEach(i => {
      const label = this.getLabel(i.params.start, this.interval);
      all.push({
        x: label,
        y: i.statistics.counts.all,
      });
      opened.push({
        x: label,
        y: i.statistics.counts.opened,
      });
      closed.push({
        x: label,
        y: i.statistics.counts.closed,
      });
    });
    const data = {
      series: [
        {
          name: 'All',
          data: all,
        },
        {
          name: 'Opened',
          data: opened,
        },
        {
          name: 'Closed',
          data: closed,
        }
      ],
    };
    this.chart = {
      chart: {
        animations: {
          enabled: false
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'line',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ['#64748B', '#0080FF', '#04B431'],
      dataLabels: {
        enabled: false
      },
      fill: {
        colors: ['#64748B', '#0080FF', '#04B431'],
        opacity: 0.5
      },
      grid: {
        show: false,
        padding: {
          bottom: -40,
          left: 0,
          right: 0
        }
      },
      legend: {
        show: true,
        position: 'top',
        labels: {
          colors: 'rgba(255,255,255,.7)'
        }
      },
      series: data.series,
      stroke: {
        curve: 'straight',
        width: 2
      },
      tooltip: {
        followCursor: true,
        theme: 'dark',
        x: {
          format: 'MMM dd, yyyy'
        }
      },
      xaxis: {
        axisBorder: {
          show: false
        },
        labels: {
          offsetY: -20,
          rotate: 0,
          style: {
            colors: 'rgba(255,255,255,.7)'
          }
        },
        tooltip: {
          enabled: false
        },
        tickAmount: 10,
        type: this.interval === 'days' ? 'datetime' : 'category',
      },
      yaxis: {
        labels: {
          style: {
            colors: 'rgba(255,255,255,.7)'
          }
        },
        max: (max): number => max + 10,
        min: (min): number => min - 50,

        show: true,
        tickAmount: 10,

      }
    };


    this.loading = false;
  }

  private getLabel(date: string, interval: string) {
    const datetime = DateTime.fromISO(date);

    switch (interval) {
      case 'years':
        return datetime.year.toString();
      case 'quarters':
        return datetime.quarter.toString();
      case 'months':
        return datetime.monthShort.toString();
      case 'weeks':
        return datetime.weekNumber.toString();
      case 'days':
      default:
        return datetime.toJSDate();
    }
  }
  /**
      * Fix the SVG fill references. This fix must be applied to all ApexCharts
      * charts in order to fix 'black color on gradient fills on certain browsers'
      * issue caused by the '<base>' tag.
      *
      * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
      *
      * @param element
      * @private
      */
  private _fixSvgFill(element: Element): void {
    // Current URL
    const currentURL = this.router.url;

    // 1. Find all elements with 'fill' attribute within the element
    // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
    // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
    Array.from(element.querySelectorAll('*[fill]'))
      .filter((el: any) => el.getAttribute('fill').indexOf('url(') !== -1)
      .forEach((el) => {
        const attrVal: any = el.getAttribute('fill');
        el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
      });
  }

}
