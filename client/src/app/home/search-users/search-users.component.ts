import { IPangolin } from './../../../data/IPangolin';
import { Component, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { PangolinService } from 'src/app/pangolin.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
})
export class SearchUsersComponent implements OnInit {
  list_pangolin: IPangolin[] | undefined = [];
  current_user!: IPangolin;
  fa_plus_circle = faPlusCircle;

  constructor(private pangolin_service: PangolinService) {}

  ngOnInit(): void {
    this.current_user = JSON.parse(localStorage.getItem('pangolin')!);
  }

  SearchInput = (input: HTMLInputElement) => {
    let value = input.value;

    if (value.length >= 3) {
      this.pangolin_service
        .SearchPangolin(this.current_user.username, value)
        .subscribe((data) => (this.list_pangolin = data));
    } else {
      this.list_pangolin = [];
    }
  };
  AddFriend = (friend_username: string) => {
    this.pangolin_service
      .AddFriend(this.current_user.username, friend_username)
      .subscribe((data) => {
        this.list_pangolin = [];
      });
  };
}
