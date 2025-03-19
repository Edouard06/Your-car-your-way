import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/olympic';

interface LineChartData {
  year: string;
  medals: number;
}

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
  standalone: false
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  public countryId!: number;
  public countryData?: OlympicCountry;
  public lineChartData: LineChartData[] = [];
  public lineChartSettings: Record<string, any> = {};
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    // Abonnez-vous aux paramètres de route
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const idParam: string | null = params.get('id');
        if (idParam) {
          this.countryId = +idParam;
          this.loadCountryData();
        } else {
          this.router.navigate(['/']);
        }
      });
  }

  private loadCountryData(): void {
    // Chargez les données olympiques depuis le service
    this.olympicService.getOlympics()
      .pipe(takeUntil(this.destroy$))
      .subscribe((countries: OlympicCountry[] | null) => {
        if (countries) {
          this.countryData = countries.find((c: OlympicCountry) => c.id === this.countryId);
          if (this.countryData) {
            this.prepareChartData();
            this.configureLineChart();
          }
        }
      });
  }

  private prepareChartData(): void {
    // Préparez les données pour le graphique en ligne
    this.lineChartData = this.countryData!.participations.map((p) => ({
      year: p.year.toString(),
      medals: p.medalsCount
    }));
  }

  private configureLineChart(): void {
    // Configurez le graphique en ligne pour afficher l'évolution des médailles
    this.lineChartSettings = {
      title: "Évolution des médailles",
      description: "Nombre de médailles par édition",
      enableAnimations: true,
      showLegend: true,
      source: this.lineChartData,
      xAxis: {
        dataField: 'year',
        unitInterval: 20,
        tickMarks: { visible: true },
        gridLines: { visible: true }
      },
      valueAxis: {
        minValue: 0,  // Commence à 0 pour une lecture plus agréable
        tickMarks: { visible: true },
        gridLines: { visible: true }
      },
      seriesGroups: [
        {
          type: 'line',
          series: [
            {
              dataField: 'medals',
              displayText: 'Médailles',
              labelsVisible: false  // Masque l'affichage des valeurs sur le graphique
            }
          ]
        }
      ]
    };
  }

  public getTotalMedals(): number {
    return this.countryData 
      ? this.countryData.participations.reduce((sum: number, p) => sum + p.medalsCount, 0)
      : 0;
  }

  public getTotalAthletes(): number {
    return this.countryData 
      ? this.countryData.participations.reduce((sum: number, p) => sum + p.athleteCount, 0)
      : 0;
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
