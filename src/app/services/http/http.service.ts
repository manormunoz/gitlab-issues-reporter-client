import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string = environment.api;
  private _project: string = '34950049';
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Accept': 'application/json'
    });
  }

  public set project(project) {
    this._project = project;
    localStorage.setItem('project', this._project);
  }

  public get project() {
    this._project = localStorage.getItem('project');
    if (!this._project) {
      this.project = '34950049';
    }
    return this._project;
  }

  public get(uri: string, params: any = null): Promise<any> {
    if (!params) {
      params = {};
    }
    params.project = this.project;
    console.log('params', params);
    return firstValueFrom(this.http.get(`${this.url}${uri}`, { headers: this.headers, params, responseType: 'json' }).pipe(first()));
  }
}
