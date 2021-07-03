import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../shared/models/user.model';
import {UserService} from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  username: string;
  firstFormGroup: FormGroup;
  users: User[];

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.queryParams.username || '';

    this.firstFormGroup = this.formBuilder.group({
      search: [this.username]
    });

    if (this.username !== '') {
      this.search();
    }
  }

  search(): void {
    this.userService.getSearchUser(this.firstFormGroup.value.search).subscribe(httpReturn => {
      this.users = httpReturn.body;
    });
  }

  redirectUser(username: string): void {
    this.router.navigate(['/' + username]);
  }

  filter(field: string): void {
    this.users.sort((a, b) => b[field] - a[field]);
  }
}
