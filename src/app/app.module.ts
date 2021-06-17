import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NotFoundComponent } from './not-found.component';
import { WeatherService } from './service/weather.service';
import { WeatherDetailComponent } from './weather-list/weather-detail/weather-detail.component';
import { WeatherDetailsComponent } from './weather-list/weather-details/weather-details.component';
import { WeatherListComponent } from './weather-list/weather-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherListComponent,
    CardComponent,
    WeatherDetailComponent,
    WeatherDetailsComponent,
    LoadingComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    WeatherService, 
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
