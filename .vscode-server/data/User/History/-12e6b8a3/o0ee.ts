import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CountryData } from '../models/country.model'; // Importez l'interface

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<CountryData[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<CountryData[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error('Error loading Olympic data:', error);
        this.olympics$.next([]);
        return throwError(() => new Error('Failed to load Olympic data'));
      })
    );
  }

  getOlympics(): Observable<CountryData[]> {
    return this.olympics$.asObservable();
  }

  getCountryById(id: string): Observable<CountryData | null> {
    return this.olympics$.asObservable().pipe(
      map((countries: CountryData[]) => {
        return countries.find(country => country.id === parseInt(id)) || null;
      })
    );
  }
}
