import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { HomeComponent } from './home/home.component';

//path the home and country tab
const routes: Routes = [

  //user visits the home component
  {path: 'home', component: HomeComponent},

  //user visits  the friends component
  {path: 'countries', component: CountryComponent},
  
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
