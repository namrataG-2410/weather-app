import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WeatherService } from "./weather.service"

describe('WeatherService', () => {
    let service: WeatherService;
    let httpMock: HttpTestingController;
    let cityName: string;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WeatherService]
        });

        service = TestBed.inject(WeatherService);
        httpMock = TestBed.inject(HttpTestingController);
        cityName = 'London';
    });

    it('should have a service instance', () => {
        expect(service).toBeDefined();
    })

    it('should return getSeaLevelDetailsByCity() data', () => {
        let result;
        service.getSeaLevelDetailsByCity(cityName).subscribe(data => {
            result = data;
        })

        const req = httpMock.expectOne({
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3d8b309701a13f65b660fa2c64cdc517`
        });

        req.flush(cityName);
        expect((result)).toContain('London');
    })
})