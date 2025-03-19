import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { CountryData } from 'src/app/core/models/country.model.ts';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnInit {
  public country$: Observable<CountryData | null> = of(null); // Initialisation avec un observable vide

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    const countryId = this.route.snapshot.paramMap.get('id');
    this.country$ = this.olympicService.getCountryById(countryId);
  }
}
