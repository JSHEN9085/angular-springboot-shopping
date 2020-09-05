import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Country } from '../common/country'; 
import { State } from '../common/state'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private countriesUrl = 'http://localhost:8080/api/countries/';
  private statesUrl = 'http://localhost:8080/api/states/'; 

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = []; 

    //build an array for "month" dropdown list
    //start from current month 

    for(let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }

    return of(data) 
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = []; 

    //build an array for "year" dropdown list
    //start from current year
    
    const startYear: number = new Date().getFullYear(); 
    const endYear: number = startYear + 10; 

    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear); 
    }
    return of(data); 
  }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    )
  }

  getStates(countryCode: string): Observable<State[]>{
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`; 

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    )
  }
}


interface GetResponseCountries {
  _embedded: {
    countries: Country[] 
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[] 
  }
}