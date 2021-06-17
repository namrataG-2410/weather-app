import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"
import { NotFoundComponent } from "./not-found.component";
import { WeatherDetailComponent } from "./weather-list/weather-detail/weather-detail.component";
import { WeatherDetailsComponent } from "./weather-list/weather-details/weather-details.component";
import { WeatherListComponent } from "./weather-list/weather-list.component"

export const routes: Routes = [
    {
        path: 'weather-list',
        component: WeatherListComponent
    },
    { path: 'weather-details/:_cityName', component: WeatherDetailsComponent },
    { path: '', redirectTo: 'weather-list', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}