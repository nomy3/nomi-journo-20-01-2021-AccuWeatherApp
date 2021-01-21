import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  baseUrl: string = "http://localhost:60807/api/";
  constructor(private http: HttpClient) { }

  public getLocations(query: string): Observable<any> {
    return this.http.get(this.baseUrl + 'Weather/GetLocations?query=' + query);
  }

  public getCurrentCondition(cityKey: number): Observable<any> {
    return this.http.get(this.baseUrl + 'Weather/GetCurrentCondition?cityKey=' + cityKey);
  }

  public getForecast(cityKey: number): Observable<any> {
    return this.http.get(this.baseUrl + 'Weather/GetForecast?cityKey=' + cityKey);
  }
}