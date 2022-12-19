import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { DateTime } from 'luxon';
import * as _ from 'lodash';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-byuser-graph',
  templateUrl: './byuser-graph.component.html',
  styleUrls: ['./byuser-graph.component.scss']
})
export class ByuserGraphComponent implements OnInit, OnChanges {

  @Input() start: DateTime;
  @Input() end: DateTime;
  @Input() author_id: number;

  loading = true;
  chart: ApexOptions;
  chartOpened: ApexOptions;
  chartClosed: ApexOptions;

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
    if (this.start && this.end) {
      this.change();
    }
  }

  async change($event = null) {
    this.loading = true;
    let issues = [];
    const params: any = {
      per_page: 100,
      page: 1,
      start: this.start.toISO(),
      end: this.end.toISO(),
    };
    if (this.author_id) {
      params.author_id = this.author_id;
    }
    const response = await this.httpService.get('/issues', params);
    issues = issues.concat(...response.body);
    const pages = response.headers['x-total-pages'] * 1;
    const petitions = [];
    for (let page = 2; page <= pages; page++) {
      const _params = { ...params };
      _params.page = page;
      console.log(_params);
      petitions.push(this.httpService.get('/issues', _params));
    }
    const results = await Promise.all(petitions);
    results.forEach(r => {
      issues = issues.concat(...r.body);
    });
    console.log(issues);
    // console.log(_data);
    const all: any = {
      labels: [],
      colors: [],
      series: [],
    };
    const closed: any = {
      series: [],
    };
    const opened: any = {
      series: [],
    };
    const grouped = _.map(_.groupBy(issues, i => i.service_desk_reply_to), (e, i) => ({user: i, issues: _.groupBy(e, j => j.state)}));
    console.log(grouped);
    grouped.forEach((g: any) => {
      console.log(g);
      all.labels.push(this.getLabel(g.user));
      all.colors.push('#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6))
      all.series.push((g.issues.closed || []).length + (g.issues.opened || []).length);
      closed.series.push((g.issues.closed || []).length);
      opened.series.push((g.issues.opened || []).length);
    });
    console.log(all);
    [].map(i => {
      const label = this.getLabel(i.service_desk_reply_to);
      console.log(label);
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

    this.chart = {
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false
          }
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'donut',
        sparkline: {
          enabled: true
        }
      },
      colors: all.colors,
      labels: all.labels,
      plotOptions: {
        pie: {
          customScale: 0.9,
          expandOnClick: false,
          donut: {
            size: '70%'
          }
        }
      },
      series: all.series,
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: false,
        theme: 'dark',
        custom: ({
          seriesIndex,
          w
        }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}</div>
                                                </div>`
      }
    };
    this.chartOpened = { ...this.chart, series: opened.series };
    this.chartClosed = { ...this.chart, series: closed.series };
    this.loading = false;
  }

  private getLabel(service_desk_reply_to: string) {
    return service_desk_reply_to.split('@')[0].toUpperCase().split('.').join(' ');
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
