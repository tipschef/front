import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Dashboard} from "../../../../shared/models/dashboard";
import {DashboardService} from "../../../../shared/services/dashboard/dashboard.service";

@Component({
  selector: 'app-sub-chart',
  templateUrl: './sub-chart.component.html',
  styleUrls: ['./sub-chart.component.css']
})
export class SubChartComponent implements OnInit {

  public dashboard: Dashboard[]

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Abonnés' },
  ]
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,145,0,0.6)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.dashboardService.getDashboardData().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.dashboard = httpReturn.body;
        for( let m of this.dashboard){
          const date = new Date(m.date);
          this.lineChartLabels.push(('0' + date.getDay()).slice(-2) +"/"+ ('0' + date.getMonth()).slice(-2) + " " + ('0' + date.getHours()).slice(-2) + ":" +('0' + date.getMinutes()).slice(-2));
          this.lineChartData[0].data.push(m.sub);
        }

      }
    })
  }

}
