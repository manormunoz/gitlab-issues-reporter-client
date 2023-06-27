import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  async ngOnInit(): Promise<void> {
    const response = await this.httpService.get('/projects');
    console.log(response);
  }

}
