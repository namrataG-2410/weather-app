import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WeatherService } from 'src/app/service/weather.service';

@Component({
    selector: 'app-weather-details',
    templateUrl: './weather-details.component.html',
    styleUrls: ['./weather-details.component.scss']
})

export class WeatherDetailsComponent implements OnInit {
    cityName: string;
    filterBy: string = '09:00:00';
    filteredWeatherList: [];
    isLoading: boolean = false;

    constructor(private route: ActivatedRoute, private service: WeatherService) {}

    ngOnInit() {
        this.isLoading = true;
        this.route.paramMap.subscribe(params => {
            this.cityName = params.get('_cityName');
        })

        this.service.getSeaLevelDetailsByCity(this.cityName).subscribe(
            (response) => {
                this.isLoading = false;
                const dataList = response['list'];
                const filteredList = dataList.filter(item => item.dt_txt.includes(this.filterBy));
                this.filteredWeatherList = filteredList.map(list => {
                    // convert Kelvin temperature to Celcius
                    const tempValNum = (parseFloat(list['main'].temp)) - 273.15;

                    return {
                        time: list['dt_txt'],
                        temp: tempValNum.toFixed(2),
                        seaLevel: list['main'].sea_level
                    }
                });            
            },
            (error) => {
                this.isLoading = false;
            }
        )
    }
}