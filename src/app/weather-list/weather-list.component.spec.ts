import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { WeatherDetailComponent } from "./weather-detail/weather-detail.component";
import { LIST_OF_CITIES, WeatherListComponent } from "./weather-list.component";

describe('WeatherListComponent', () => {
    let comp: WeatherListComponent;
    let fixture: ComponentFixture<WeatherListComponent>;
    let debugElement: DebugElement[];

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [WeatherListComponent],
        }).compileComponents();
    }));

    it('should display cities', () => {
        fixture = TestBed.createComponent(WeatherListComponent);
        comp = fixture.componentInstance;
        expect(comp.cities.length).toBeGreaterThan(0);
    });

    it('1st city should match 1st test city', () => {
        fixture = TestBed.createComponent(WeatherListComponent);
        comp = fixture.componentInstance;
        let element: any;
        let actualCity: string;
        fixture.detectChanges();
        element = document.querySelectorAll('span.city_name');
        actualCity = element[0].innerHTML;
        expect(actualCity).toContain('London');
    });

    it('should test click', () => {
        fixture = TestBed.createComponent(WeatherListComponent);
        comp = fixture.componentInstance;
        spyOn(comp, 'onSelectCity');
        fixture.detectChanges();
        debugElement = fixture.debugElement.query(By.css('li')).nativeElement.click();
        expect(comp.onSelectCity).toHaveBeenCalled();
    });
})


