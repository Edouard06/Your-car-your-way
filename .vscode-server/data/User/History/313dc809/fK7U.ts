import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/olympic';
import { jqxChartComponent } from 'jqwidgets-ng/jqxchart';

interface ChartData {
  country: string;
  medals: number;
}

interface PieChartSettings {
  title: string;
  description: string;
  enableAnimations: boolean;
  showLegend: boolean;
  source: ChartData[];
  colorScheme: string;
  seriesGroups: Array<{
    type: string;
    showLabels: boolean;
    showToolTips: boolean;
    labelFormat: string;
    formatFunction: (value: number, itemIndex: number) => string;
    toolTipFormatFunction: (value: number, itemIndex: number) => string;
    series: Array<{
      dataField: string;
      labelRadius: number;
      initialAngle: number;
      radius: number;
      centerOffset: number;
    }>;
  }>;
}

interface JqxChartEventArgs {
  elementIndex?: number;
}

interface JqxChartEvent {
  args?: JqxChartEventArgs;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  public countries: OlympicCountry[] = [];
  public chartData: ChartData[] = [];
  public pieChartSettings!: PieChartSettings;
  private destroy$: Subject<void> = new Subject<void>();

  // Récupère une référence à l'instance du composant jqxChart dans le template.
  @ViewChild('pieChart', { static: false }) public pieChart!: jqxChartComponent;

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    this.olympicService.getOlympics()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: OlympicCountry[] | null) => {
        if (data) {
          this.countries = data;
          this.prepareChartData();
          this.configurePieChart();
        }
      });
  }

  private prepareChartData(): void {
    this.chartData = this.countries.map((country: OlympicCountry): ChartData => ({
      country: country.country,
      medals: country.participations.reduce((sum: number, p) => sum + p.medalsCount, 0)
    }));
  }

  private configurePieChart(): void {
    this.pieChartSettings = {
      title: "Total des médailles par pays",
      description: "Visualisation du nombre total de médailles pour chaque pays",
      enableAnimations: true,
      showLegend: true,
      source: this.chartData,
      colorScheme: 'scheme01',
      seriesGroups: [
        {
          type: 'pie',
          showLabels: true,
          showToolTips: true,
          labelFormat: 'custom',
          formatFunction: (value: number, itemIndex: number): string => {
            // Affiche uniquement le nom du pays sur la tranche.
            return this.chartData[itemIndex].country;
          },
          toolTipFormatFunction: (value: number, itemIndex: number): string => {
            // Au survol, affiche "NomDuPays: X médailles".
            return `${this.chartData[itemIndex].country}: ${value} médailles`;
          },
          series: [
            {
              dataField: 'medals',
              labelRadius: 120,
              initialAngle: 15,
              radius: 120,
              centerOffset: 0
            }
          ]
        }
      ]
    };
  }

  public onChartClick(event: JqxChartEvent): void {
    // Cache le tooltip avant de naviguer pour éviter l'affichage aléatoire.
    if (this.pieChart) {
      this.pieChart.hideToolTip();
    }
    // Récupère l'index du secteur cliqué et navigue vers la page détail.
    if (event.args && typeof event.args.elementIndex === 'number') {
      const index: number = event.args.elementIndex;
      const selectedCountry: OlympicCountry | undefined = this.countries[index];
      if (selectedCountry) {
        this.router.navigate(['/detail', selectedCountry.id]);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
