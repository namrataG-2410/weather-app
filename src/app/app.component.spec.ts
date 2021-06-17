/* tslint:disable:no-unused-variable */
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Location } from "@angular/common";
import { TestBed, fakeAsync, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

import { WeatherListComponent } from "./weather-list/weather-list.component";

@Component({
  template: `
    <a routerLink="/weather-list">Weather List</a>
    <router-outlet></router-outlet>
  `
})
class TestComponent {}

describe("component: TestComponent", () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([
        { path: 'weather-list', component: WeatherListComponent }
      ])],
      declarations: [TestComponent, WeatherListComponent]
    });
  });

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    location = _location;
    router = _router;
  }));

  it('navigate you to /weather-list', fakeAsync(() => {
    let fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    router.navigate(['/weather-list']).then(() => {
      expect(location.path()).toBe("/weather-list");
    });
  }));
});