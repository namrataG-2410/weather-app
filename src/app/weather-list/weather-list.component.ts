import { Component, OnInit } from '@angular/core';

export const LIST_OF_CITIES = ['London', 'Paris', 'Moscow', 'Madrid', 'Amsterdam'];

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})

export class WeatherListComponent implements OnInit {
  cities: string[] = LIST_OF_CITIES;
  selectedCity: string = this.cities[0];
  
  constructor() {}

  ngOnInit() {}

  onSelectCity(city: string) {
    this.selectedCity = city;
  }
}