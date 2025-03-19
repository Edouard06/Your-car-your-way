import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';import { CountryData } from '../models/country.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error('Error loading Olympic data:', error); // Affiche l'erreur technique
        console.warn('Failed to load Olympic data. Please try again later.'); // Message plus clair pour le développeur
        this.olympics$.next(null); // Informe les abonnés qu'il n'y a pas de données disponibles
        return throwError(() => new Error('Failed to load Olympic data')); // Stoppe l'observable et rejette l'erreur
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
}
