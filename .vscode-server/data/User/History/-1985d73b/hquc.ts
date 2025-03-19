import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    jqxChartModule,
    HomeComponent,        
    CountryDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
