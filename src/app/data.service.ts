import { Injectable, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, HttpModule } from '@angular/http';

@Injectable()

export class DataService {

  private goals = new BehaviorSubject<any>(['List Item #1', 'Another list item']);
  goal = this.goals.asObservable();
  values: any;
  loading: boolean;

  constructor( private http: Http ) { }

  changeGoal(goal) {
    this.goals.next(goal);
  }

  dataRequest(): void {
    this.loading = true;
    this.http.get('http://localhost:3000/posts/1')

    .subscribe(
      (res: Response) => {
        this.values = res.json();
        console.log(this.values)
        this.loading = false;
        return this.values;
      }
    );
  }

}
