import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  siteTitle = 'Site Title Home';
  name:string;
  list:any;
  selected :any;

  // Main Nav Links Array
  constructor() {
    this.list = ['About','Charts']; 
  }
  select(item) {
    this.selected = item; 
  };
  isActive(item) {
      return this.selected === item;
  };
}
