import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPangolin } from 'src/data/IPangolin';
import {
  faUserAlt,
  faUsers,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FriendsListComponent } from './friends-list/friends-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  current_pangolin: IPangolin | undefined;
  show_component: number | null = null;

  fa_user = faUserAlt;
  fa_users = faUsers;
  fa_user_plus = faUserPlus;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (
      !localStorage.getItem('pangolin') ||
      (!localStorage.getItem('pangolin') &&
        !localStorage.getItem('pangolin')?.length)
    ) {
      this.router.navigate(['login']);
    }
    if (
      !localStorage.getItem('pangolin') ||
      (!localStorage.getItem('pangolin') &&
        !localStorage.getItem('pangolin')?.length)
    ) {
      this.router.navigate(['login']);
    }

    this.current_pangolin = JSON.parse(localStorage.getItem('pangolin')!);
    this.show_component = 1;
  }

  goToProfile = () => {
    this.router.navigate(['/profile']);
  };
  ShowFriendList = () => {
    this.show_component = 1;
  };
  ShowSearcUsers = () => {
    this.show_component = 2;
  };
}
