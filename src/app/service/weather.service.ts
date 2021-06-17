import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { map, filter } from 'rxjs/operators';

const TIME_ZONE = [
    { timeZone: 'Europe/London', city: 'London', country: 'GB' },
    { timeZone: 'Europe/Madrid', city: 'Madrid', country: 'ES' },
    { timeZone: 'Europe/Amsterdam', city: 'Amsterdam', country: 'NL' },
    { timeZone: 'Europe/Paris', city: 'Paris', country: 'FR' },
    { timeZone: 'Europe/Moscow', city: 'Moscow', country: 'RU' }
];

@Injectable()

export class WeatherService {
    sharingData: string;

    constructor(private http: HttpClient) {}

    saveCityName(str: string){
        this.sharingData = str; 
    }
    getCityName() {
        return this.sharingData;
    }

    epochToDate(epoch: number) {
        if (epoch < 10000000000)  {   
            epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
        }
        var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone        
        return new Date(epoch);
    }

    
    getWeatherDetailsByCity(name: string) {
        return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=3d8b309701a13f65b660fa2c64cdc517`).pipe(
            map(data => {
                // convert Kelvin temperature to Celcius
                const tempValNum = (parseFloat(data['main'].temp)) - 273.15;

                // convert sunrise & sunset EPOCH to IST
                const sunriseIST = this.epochToDate(data['sys'].sunrise);
                const sunsetIST = this.epochToDate(data['sys'].sunset);

                // convert to country timezone
                const selectedName = TIME_ZONE.filter(item => item.city === name);

                let riseTime = sunriseIST.toLocaleTimeString('en-'+selectedName[0].country, { timeZone: selectedName[0].timeZone });
                const setTime =  sunsetIST.toLocaleTimeString('en-'+selectedName[0].country, { timeZone: selectedName[0].timeZone });

                var convertedTime = moment(setTime, 'hh:mm:ss A').format('HH:mm:ss')

                if (!riseTime.includes('AM')) {
                    riseTime = riseTime+' AM';
                }

                return {
                    city: data['name'],
                    temperature: tempValNum.toFixed(2),
                    sunriseTime: riseTime,
                    sunsetTime: convertedTime + ' PM'
                }
            })
        )
    }

    getSeaLevelDetailsByCity(name: string) {
        return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=3d8b309701a13f65b660fa2c64cdc517`);
    }
}