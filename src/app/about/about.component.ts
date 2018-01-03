import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

import { Observable } from 'rxjs';
import { ReturnsJsonArrayService } from '../returns-json-array.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ReturnsJsonArrayService]
})
export class AboutComponent implements OnInit {
  
  goals: any;

  data: Observable<Array<any>>;


  constructor(private route: ActivatedRoute, private router: Router, private _data: DataService, private service: ReturnsJsonArrayService) {
    //this.route.params.subscribe(res => console.log(res.id));
    this.data = service.getPeople();
    console.log("AppComponent.data:" + this.data);
  }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
  }

  sendMeHome() {
    this.router.navigate(['']);  // The array is empty because it corresponds with the Home component
  }
}
