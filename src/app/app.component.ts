import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'accuweather-app';
  currentCondition: any;
  forcast: any[] = [];
  cityName: string = "Jerusalem | Israel";

  constructor (private appService: AppService) { }
  
  ngOnInit(): void {
    this.setForecast(213225);
  }

  selectForecast(city: any) {
    this.cityName = city.localizedName + " | "+ city.country.localizedName; 
    this.setForecast(city.key);
  }

  setForecast(cityKey: number) {
    this.appService.getCurrentCondition(cityKey).subscribe(r => {
      this.currentCondition = r[0];
    });
  
    this.appService.getForecast(cityKey).subscribe(r => {
      this.forcast = r.dailyForecasts;
    });
  }
}
