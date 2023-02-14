import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../services/http/http.service';
import { DateTime, Duration } from 'luxon';

interface Issue {
  id: number;
  service_desk_reply_to: string;
  title: string;
  state: string;
  created_at: string;
  closed_at?: string;
  closed_by?: string;
  labels?: string;
  milestone?: string;
  web_url: string;
  total_time_spent?: string;
  weight: number;
};

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit, OnChanges{
  loading = true;
  period = 'last-15-days';
  interval: any = 'days';
  @Input() start: DateTime;
  @Input() end: DateTime;
  @Input() author_id: number;


  displayedColumns: string[] = [
    'id',
    'service_desk_reply_to',
    'title',
    'state',
    'created_at',
    // 'closed_at',
       // 'labels',
    // 'milestone',
    'closed_by',
    'total_time_spent',
    'weight',
    'web_url',
  ];
  dataSource: MatTableDataSource<Issue>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  tablePageSize = 20;
  tableLength = 300;

  constructor(private httpService: HttpService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.start && this.end){
      this.change();
    }
  }
  async change($event: any = null) {
    this.loading = true;
    // load issues
    const params: any= {
      per_page: this.paginator?.pageSize || 20,
      page: (this.paginator?.pageIndex || 0) + 1,
      start: this.start.toISO(),
      end: this.end.toISO(),
    };
    if (this.author_id) {
      params.author_id = this.author_id;
    }
    const response = await this.httpService.get('/issues', params);
    // = parseInt(response.headers['x-total-pages'], 10);
    this.tableLength = parseInt(response.headers['x-total'], 10);
    this.tablePageSize = parseInt(response.headers['x-per-page'], 10);
    const issues = response.body.map((issue: any) => {
      return {
        id: issue.id,
        service_desk_reply_to: (issue.service_desk_reply_to || '').toLowerCase(),
        title: issue.title,
        state: issue.state,
        created_at: DateTime.fromISO(issue.created_at).toLocaleString(),
        closed_at: issue.closed_at ? DateTime.fromISO(issue.closed_at).toLocaleString() : '',
        closed_by: issue.closed_by?.name || '',
        labels: (issue.labels, []).join(', '),
        milestone: issue.milestone,
        web_url: issue.web_url,
        total_time_spent: Duration.fromDurationLike({ seconds: issue.time_stats.total_time_spent * 1 }).toFormat(`d'd' h'h' m'm'`),
        weight: issue.weight || 1,
      };
    });
    if (!this.dataSource) {

      this.dataSource = new MatTableDataSource(issues);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    } else {
      this.dataSource.data = issues;
      // this.dataSource.paginator.pageIndex = this.dataSource.paginator.pageIndex + 1;
    }
    this.loading = false;
  }

}
