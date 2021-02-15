import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { CountryComponent } from './country/country.component';
import { HttpClientModule } from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent
  ],

  //Add the HttpClientModule,FormsModule,ReactiveFormsModule
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
//Configures the dependency injector for HttpClient with supporting services
//Exports the required providers and directives for template-driven forms
//Provides options for configuring
export class AppModule { }
