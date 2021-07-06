import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Dashboard} from '../../../shared/models/dashboard';
import {DashboardService} from '../../../shared/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */

  public dashboard: Dashboard[];

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return {
          columns: 1,
          chart: {cols: 1, rows: 2},
        };
      }

      return {
        columns: 4,
        chart: {cols: 2, rows: 3},
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.dashboardService.getDashboardData().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.dashboard = httpReturn.body;
      }
    });
  }

}
