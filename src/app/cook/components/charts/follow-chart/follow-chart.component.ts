import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Dashboard} from "../../../../shared/models/dashboard";
import {DashboardService} from "../../../../shared/services/dashboard/dashboard.service";

@Component({
  selector: 'app-follow-chart',
  templateUrl: './follow-chart.component.html',
  styleUrls: ['./follow-chart.component.css']
})
export class FollowChartComponent implements OnInit {

  public dashboard: Dashboard[]

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Follows' },
  ]
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: false,
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
        console.log(this.dashboard)
        for( let m of this.dashboard){
          this.lineChartLabels.push(m.date.toString())
          this.lineChartData[0].data.push(m.follower)
        }

      }
    })
  }

}
