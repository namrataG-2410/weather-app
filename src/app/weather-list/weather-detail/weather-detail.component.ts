import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit, OnChanges {  
  _cityName: string;
  weatherDetails: any;
  today: number = Date.now();

  isLoading: boolean = false;

  @Input()
  set cityName(cityName: string) {
    this._cityName = cityName;
  }

  constructor(private service: WeatherService, private router: Router) {
  }

  ngOnChanges() {
    this.isLoading = true;
    this.service.getWeatherDetailsByCity(this._cityName)
      .subscribe(
          (response) => {
            this.isLoading = false;
            this.weatherDetails = response;
          },
          (error) => {
            this.isLoading = false;
          }
      )
  }

  ngOnInit() {
    
  }

  onNavigate() {
    this.router.navigate([`/weather-details/${this._cityName}`])
  }

}