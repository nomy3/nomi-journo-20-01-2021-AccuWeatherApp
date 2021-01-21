import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppService} from '../../app.service';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-cities',
  templateUrl: './autocomplete-cities.component.html',
  styleUrls: ['./autocomplete-cities.component.css']
})
export class AutocompleteCitiesComponent implements OnInit {
  cities: any = [];
  citiesForm: FormGroup;
  isLoading = false;
  @Output() select: EventEmitter<any> = new EventEmitter();
  
  constructor(private fb: FormBuilder, private appService: AppService) {
    this.citiesForm = new FormGroup({});
  }

  ngOnInit() {
    this.citiesForm = this.fb.group({
      userInput: null
    })

    this.citiesForm
    .get('userInput')!
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value => this.appService.getLocations(value)
      .pipe(
        finalize(() => this.isLoading = false),
        )
      )
    )
    .subscribe(cities => this.cities = cities);
  }

  displayFn(city: any) {
    if (city) { 
      this.select.emit(city);
      return city.localizedName + " | "+ city.country.localizedName; 
    }
    return "";
  }
}
