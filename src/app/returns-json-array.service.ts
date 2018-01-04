import { Injectable } from '@angular/core';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ReturnsJsonArrayService {

  constructor(private http: Http) { }

  getPeople(): Observable<any> {
    return this.http.get("http://localhost:3000/posts")

    // call the json file on the response to return data
    .map((res:Response) => res.json())
    // Catch any errors
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
