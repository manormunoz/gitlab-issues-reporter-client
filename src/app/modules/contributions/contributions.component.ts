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
  chart: ApexOptions;
  chartZebraFront: ApexOptions;
  chartZebraBack: ApexOptions;
  chartMigrationScripts: ApexOptions;
  chartZBot: ApexOptions;
  chartZebraApp: ApexOptions;
  chartDotsFront: ApexOptions;
  chartDotsBack: ApexOptions;

  values: any = {
    zebrafront: {
      name: 'ZebraFrontend',
      contributions: [
        {
          author: 'Orlando Muñoz',
          value: 1167144,
          color: '#2E2E2E',
        },
        {
          author: 'Areli Mosqueda',
          value: 951264,
          color: '#FFBF00',
        },
        {
          author: 'Álvaro Centeno',
          value: 63223,
          color: '#8A0868',
        },
        {
          author: 'Armando Loredo',
          value: 753826,
          color: '#FF8000',
        },
        {
          author: 'Ghost User',
          value: 407945,
          color: '#BDBDBD',
        },
      ]
    },
    zebraback: {
      name: 'ZebraBackend',
      contributions: [
        {
          author: 'Orlando Muñoz',
          value: 86836,
          color: '#2E2E2E',
        },
        {
          author: 'Areli Mosqueda',
          value: 82396,
          color: '#FFBF00',
        },
        {
          author: 'Álvaro Centeno',
          value: 63907,
          color: '#8A0868',
        },
        {
          author: 'Armando Loredo',
          value: 139984,
          color: '#FF8000',
        },
        {
          author: 'Ghost User',
          value: 255054,
          color: '#BDBDBD',
        },
      ]
    },
    migrationscripts: {
      name: 'MigrationScripts',
      contributions: [
        {
          author: 'Orlando Muñoz',
          value: 24779,
          color: '#2E2E2E',
        },
        {
          author: 'Álvaro Centeno',
          value: 2335,
          color: '#8A0868',
        },
        {
          author: 'Armando Loredo',
          value: 6570,
          color: '#FF8000',
        },
      ]
    },
    zbot: {
      name: 'Z-Bot',
      contributions: [
        {
          author: 'Orlando Muñoz',
          value: 40026,
          color: '#2E2E2E',
        },
        // {
        //   author: 'Álvaro Centeno',
        //   value: 2335,
        //   color: '#8A0868',
        // },
        // {
        //   author: 'Armando Loredo',
        //   value: 6570,
        //   color: '#FF8000',
        // },
      ],
    },
    zebraapp: {
      name: 'ZebraApp',
      contributions: [
        {
          author: 'Orlando Muñoz',
          value: 44478,
          color: '#2E2E2E',
        },
        // {
        //   author: 'Álvaro Centeno',
        //   value: 2335,
        //   color: '#8A0868',
        // },
        // {
        //   author: 'Armando Loredo',
        //   value: 6570,
        //   color: '#FF8000',
        // },
      ],
    },
    dotsclient: {
      name: 'DotsFrontEnd',
      contributions: [
        {
          author: 'Orlando Muñoz',
          value: 34223,
          color: '#2E2E2E',
        },
        {
          author: 'Saúl Martínez',
          value: 20633,
          color: '#0489B1',
        },
        // {
        //   author: 'Álvaro Centeno',
        //   value: 2335,
        //   color: '#8A0868',
        // },
        // {
        //   author: 'Armando Loredo',
        //   value: 6570,
        //   color: '#FF8000',
        // },
      ],
    },
    dotsback: {
      name: 'DotsBackEnd',
      contributions: [
        {
          author: 'Orlando Muñoz',
          value: 202311,
          color: '#2E2E2E',
        },
        {
          author: 'Saúl Martínez',
          value: 34832,
          color: '#0489B1',
        },
        // {
        //   author: 'Álvaro Centeno',
        //   value: 2335,
        //   color: '#8A0868',
        // },
        // {
        //   author: 'Armando Loredo',
        //   value: 6570,
        //   color: '#FF8000',
        // },
      ],
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

    const gColors = new Set([]);
    const gLabels = new Set([]);
    const gSeries: any = {};
    _.each(this.values, (project) => {
      project.contributions.forEach(c => {
        gColors.add(c.color);
        gLabels.add(c.author);
        gSeries[c.author] = (gSeries[c.author] || 0) + c.value;
      });
    });
    const total = _.sum(_.map(gSeries, s => s));
    this.chart = {
      ...this.chartZebraFront,
      colors: Array.from(gColors),
      labels: Array.from(gLabels),
      series: _.map(gSeries, s => Number((s * 100 / total).toFixed(2))),
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
    this.chartZBot = {
      ...this.chartZebraFront,
      colors: this.values.zbot.contributions.map(c => c.color),
      labels: this.values.zbot.contributions.map(c => c.author),
      series: this.values.zbot.contributions.map(c => this.getPercentage(this.values.zbot, c.value)),
    };
    this.chartZebraApp = {
      ...this.chartZebraFront,
      colors: this.values.zebraapp.contributions.map(c => c.color),
      labels: this.values.zebraapp.contributions.map(c => c.author),
      series: this.values.zebraapp.contributions.map(c => this.getPercentage(this.values.zebraapp, c.value)),
    };
    this.chartDotsBack = {
      ...this.chartZebraFront,
      colors: this.values.dotsback.contributions.map(c => c.color),
      labels: this.values.dotsback.contributions.map(c => c.author),
      series: this.values.dotsback.contributions.map(c => this.getPercentage(this.values.dotsback, c.value)),
    };
    this.chartDotsFront = {
      ...this.chartZebraFront,
      colors: this.values.dotsclient.contributions.map(c => c.color),
      labels: this.values.dotsclient.contributions.map(c => c.author),
      series: this.values.dotsclient.contributions.map(c => this.getPercentage(this.values.dotsclient, c.value)),
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
