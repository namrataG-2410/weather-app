import { Component } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { CardComponent } from "./card.component";

@Component({
    selector: 'card',
    template: `
        <app-card>
            <div class="city">London</div>
            <div class="todayDate">
                <div>Today's Date</div>
            </div>
            <div class="temperature">27<sup>&#8451;</sup></div>
            <div class="sunriseTime">
                <span>Sunrise</span>
                <div>05:00:00</div>
            </div>
            <div class="sunsetTime">
                <span>Sunset</span>
                <div>21:00:00</div>
            </div>
            <div class="next-btn">
                It's a button
            </div>
        </app-card>
    `
})

class DummyComponent {}

describe('Card component', () => {
    let component: DummyComponent;
    let fixture: ComponentFixture<DummyComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DummyComponent, CardComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DummyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the name of the city', () => {
        let element = fixture.debugElement.query(By.css('app-card')).query(By.css('.city'));
        let innerEle = element.nativeElement.innerHTML;

        expect(innerEle).toContain('London');
    });
})

