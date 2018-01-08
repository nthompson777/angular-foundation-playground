import { Injectable, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, HttpModule } from '@angular/http';

@Injectable()

export class DataService {

  private goals = new BehaviorSubject<any>(['List Item #1', 'Another list item']);
  goal = this.goals.asObservable();
  data: any;
  loading: boolean;

  constructor( private url: Http ) { }

  changeGoal(goal) {
    this.goals.next(goal);
  }

  dataRequest(): void {
    this.loading = true;
    this.url.get('http://localhost:3000/posts')

    .subscribe((res: Response) => {
      this.data = res.json();
      //console.log(this.data)
      this.loading = false;
    }); 
  }
}