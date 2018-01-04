import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Http, Response, HttpModule } from '@angular/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AboutComponent implements OnInit {

  goals: any;
  data: any;
  loading: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataService, private  http: Http) {
    //this.route.params.subscribe(res => console.log(res.id));
  }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.dataRequest();
  }

  dataRequest(): void {
    this.loading = true;
    this.http.get('http://localhost:3000/posts')

    .subscribe((res: Response) => {
      this.data = res.json();
      // console.log(this.data)
      this.loading = false;
    });
  }

  sendMeHome() {
    this.router.navigate(['']);  // The array is empty because it corresponds with the Home component
  }
}
