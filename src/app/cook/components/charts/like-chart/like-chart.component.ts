import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {DashboardService} from '../../../../shared/services/dashboard/dashboard.service';
import {Dashboard} from '../../../../shared/models/dashboard';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-like-chart',
  templateUrl: './like-chart.component.html',
  styleUrls: ['./like-chart.component.css']
})
export class LikeChartComponent implements OnInit {

  @Input() dashboard: Dashboard[];

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Likes' },
  ];
  lineChartLabels: Label[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,145,0,0.6)',
    },
  ];
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartPlugins = [];

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    for ( const m of this.dashboard){
      this.lineChartLabels.push(this.datePipe.transform(m.date, 'dd/MM/yyyy HH:mm', '+0400'));
      this.lineChartData[0].data.push(m.like);
    }
  }
}
