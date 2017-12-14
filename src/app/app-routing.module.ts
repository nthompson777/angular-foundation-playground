import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SimplechartComponent } from './charts/simplechart.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
