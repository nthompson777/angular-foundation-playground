import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SimplechartComponent } from './charts/simplechart.component';
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'About',    // path: 'about/:id'  the ':id' is what's called a 'Route Parameter'
    component: AboutComponent
  },
  {
    path: 'Charts',
    component: SimplechartComponent
  },
  {
    path: 'Grid',
    component: MyGridApplicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
