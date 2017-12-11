import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { SimplechartComponent } from '../charts/simplechart.component';
declare var $:any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity: 0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})  
          ]))
        ]), {optional: true}),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1})  
          ]))
        ]), {optional: true}),
        
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {

  itemCount: number = 4;  
  btnText: string = 'Add an item';
  goalText: string = '';   // Used in the Two-way data-binding example in home.component.html
  goals = [];  // empty array

  constructor(private _data: DataService) { }

  // ngOnInit is a lifecycle hook that is initiated/loaded when the app loads
  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);  // changeGoal imported from data.service.ts
    $(document).foundation(); // Load Foundation components for this page
  }

  addItem() {
    this.goals.push(this.goalText);  
    this.goalText = '';  // Clears out the input after it's submitted 
    this.itemCount = this.goals.length; 
    this._data.changeGoal(this.goals);  // changeGoal imported from data.service.ts
  }

  removeItem(i) {
    this.goals.splice(i, 1);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);  // changeGoal imported from data.service.ts
  }
}

/* Highcharts.chart('container', {
  title: {
      text: 'Chart reflow is set to true'
  },

  subtitle: {
      text: 'When resizing the window or the frame, the chart should resize'
  },


  xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },

  series: [{
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
  }]
}); */