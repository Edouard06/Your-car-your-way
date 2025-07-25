import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { CountryData } from 'src/app/core/models/country.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<CountryData[]> = of([]);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }
  onCountryClick(country: CountryData) {
  }
  totalMedals(country: CountryData): number {
    return country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
  }

  totalAthletes(country: CountryData): number {
    return country.participations.reduce((sum, p) => sum + p.athleteCount, 0);
  }
}
