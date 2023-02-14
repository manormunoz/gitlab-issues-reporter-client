import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import * as _ from 'lodash';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'contributions',
  templateUrl: './contributions.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ContributionsComponent implements OnInit {
  loading = true;
  chartZebraFront: ApexOptions;
  chartZebraBack: ApexOptions;
  chartMigrationScripts: ApexOptions;
  values: any = {
    zebrafront: {
      name: 'ZebraFrontend',
      contributions: [
        {
          author: 'Orlando Muñoz',
          value: 579,
          color: '#2E2E2E',
        },
        {
          author: 'Areli Mosqueda',
          value: 426,
          color: '#FFBF00',
        },
        {
          author: 'Álvaro Centeno',
          value: 207,
          color: '#8A0868',
        },
        {
          author: 'Armando Loredo',
          value: 246,
          color: '#FF8000',
        },
        {
          author: 'Ghost User',
          value: 578,
          color: '#BDBDBD',
        },
      ]
    },
    zebraback: {
      name: 'ZebraBackend',
      contributions: [
        {
          author: 'Orlando Muñoz',
          value: 864,
          color: '#2E2E2E',
        },
        {
          author: 'Areli Mosqueda',
          value: 202,
          color: '#FFBF00',
        },
        {
          author: 'Álvaro Centeno',
          value: 193,
          color: '#8A0868',
        },
        {
          author: 'Armando Loredo',
          value: 180,
          color: '#FF8000',
        },
        {
          author: 'Ghost User',
          value: 952,
          color: '#BDBDBD',
        },
      ]
    },
    migrationscripts: {
      name: 'MigrationScripts',
      contributions: [
        {
          author: 'Orlando Muñoz',
          value: 104,
          color: '#2E2E2E',
        },
        {
          author: 'Álvaro Centeno',
          value: 49,
          color: '#8A0868',
        },
        {
          author: 'Armando Loredo',
          value: 29,
          color: '#FF8000',
        },
      ]
    },
  };
  /**
   * Constructor
   */
  constructor(private router: Router) {
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
    this.chartZebraFront = {
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
      colors: this.values.zebrafront.contributions.map(c => c.color),
      labels: this.values.zebrafront.contributions.map(c => c.author),
      series: this.values.zebrafront.contributions.map(c => this.getPercentage(this.values.zebrafront, c.value)),
      plotOptions: {
        pie: {
          customScale: 0.9,
          expandOnClick: false,
          donut: {
            size: '70%'
          }
        }
      },
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
    this.chartZebraBack = {
      ...this.chartZebraFront,
      colors: this.values.zebraback.contributions.map(c => c.color),
      labels: this.values.zebraback.contributions.map(c => c.author),
      series: this.values.zebraback.contributions.map(c => this.getPercentage(this.values.zebraback, c.value)),
    };
    this.chartMigrationScripts = {
      ...this.chartZebraFront,
      colors: this.values.migrationscripts.contributions.map(c => c.color),
      labels: this.values.migrationscripts.contributions.map(c => c.author),
      series: this.values.migrationscripts.contributions.map(c => this.getPercentage(this.values.migrationscripts, c.value)),
    };
    setTimeout(() => {
      this.loading = false;
    }, 1000);
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

  public getPercentage(project, value) {
    const total = _.sumBy(project.contributions, (c: any) => c.value);
    return Number((value * 100 / total).toFixed(2));
  }

}
