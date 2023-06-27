import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  project: string;
  projects: any [] = [];

  constructor(private httpService: HttpService) {
    this.project = this.httpService.project;
  }

  async ngOnInit(): Promise<void> {
    const response = await this.httpService.get('/projects');
    this.projects = response.map(p => ({id: p.id.toString(), name: p.name}));
    console.log(this.projects);
  }

  changeProject() {
    this.httpService.project = this.project;
    setTimeout(() => {
      location.reload();
    }, 30);
  }


}
