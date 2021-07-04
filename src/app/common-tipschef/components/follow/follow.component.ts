import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FollowService} from "../../../shared/services/follow/follow.service";
import {UserService} from "../../../shared/services/user/user.service";
import {Follow} from "../../../shared/models/follow";
import {Router} from "@angular/router";

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit, AfterViewInit {

  follows: Array<Follow> | null = [];

  displayedColumns: Array<string> | null = ['username', 'date', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private followService: FollowService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.followService.getFollows().subscribe(httpResponse => {
      if (httpResponse.body != null && httpResponse.body) {
        this.follows = httpResponse.body;
        this.dataSource = new MatTableDataSource(this.follows);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource != null) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator != null) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  unfollow(user): void{
    this.userService.unfollowUser(user.username).subscribe(httpReturn => {
      this.loadData();
    });
  }

  redirect(user): void {
    this.router.navigate([user.username]);
  }
}
