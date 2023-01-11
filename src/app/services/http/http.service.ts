import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // url: string = 'http://10.1.100.239:3200';
  url: string = 'http://localhost:3200';
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Accept': 'application/json'
   });
  }

  public get(uri: string, params: any = null): Promise<any> {
    return firstValueFrom(this.http.get(`${this.url}${uri}`, { headers: this.headers, params, responseType: 'json' }).pipe(first()));
  }
}
