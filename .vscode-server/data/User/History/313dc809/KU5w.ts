import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {
  countries: OlympicCountry[] = [];
  // Données formatées pour le chart
  chartData: any[] = [];
  // Objet de configuration pour jqxChart (pie chart)
  pieChartSettings: any;

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe((data) => {
      if (data) {
        this.countries = data;
        // Calculer le total des médailles pour chaque pays
        // this.chartData = data.map(country => ({
        //   country: country.country,
        //   medals: country.participations.reduce((sum, p) => sum + p.medalsCount, 0)
        // }));

        this.chartData = data.map(country => ({
          country: country.country,
          medals: Array.isArray(country.participations)
            ? country.participations.reduce((sum, p) => sum + p.medalsCount, 0)
            : 0
        }));
        

        // Configuration du jqxChart pour un graphique circulaire
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
              // Active l'affichage des labels et des tooltips
              showLabels: true,
              showToolTips: true,
              // Force l'utilisation d'un format personnalisé pour les labels
              labelFormat: 'custom',
              // labelFormatFunction : détermine l'étiquette affichée sur la tranche
              labelFormatFunction: (value: any, itemIndex: number, series: any, group: any) => {
                // On ne renvoie que le nom du pays
                return this.chartData[itemIndex].country;
              },
              // legendFormat: 'custom' + legendFormatFunction (optionnel) si vous souhaitez
              // aussi personnaliser la légende pour n'y afficher que le nom du pays :
              legendFormat: 'custom',
              legendFormatFunction: (value: any, dataIndex: number, series: any, group: any) => {
                // On ne renvoie que le nom du pays pour la légende
                return this.chartData[dataIndex].country;
              },
              series: [
                {
                  dataField: 'medals',
                  displayText: 'country', 
                  labelRadius: 120,
                  initialAngle: 15,
                  radius: 120,
                  centerOffset: 0,
                  // toolTipFormatFunction : détermine le contenu du tooltip au survol
                  toolTipFormatFunction: (
                    value: any,
                    itemIndex: number,
                    series: any,
                    group: any,
                    categoryValue: any,
                    categoryAxis: any
                  ) => {
                    // Affiche "NomDuPays : X médailles" au survol
                    return this.chartData[itemIndex].country + ": " + value + " médailles";
                  }
                }
              ]
            }
          ]
        };
      }
    }
    );
  }
        

  // Méthode pour gérer le clic sur un segment du graphique
  onChartClick(event: any): void {
    // La récupération de l'élément cliqué dépendra de l'événement émis par jqxChart.
    // Vous pouvez par exemple exploiter event.args afin de récupérer l'index ou la valeur associée.
    // Ici, nous supposons que l'élément possède un attribut 'data-index'.
    const args = event.args;
    if (args && args.element && args.element.attributes && args.element.attributes['data-index']) {
      const index = +args.element.attributes['data-index'].value;
      const selectedCountry = this.countries[index];
      if (selectedCountry) {
        this.router.navigate(['/detail', selectedCountry.id]);
      }
    }
    // Ajustez cette méthode en fonction des détails de l'événement fourni par jqxChart.
  }
}
