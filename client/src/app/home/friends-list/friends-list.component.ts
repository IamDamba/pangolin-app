import { Component, Input } from '@angular/core';
import {
  faPlusCircle,
  faDeleteLeft,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { PangolinService } from 'src/app/pangolin.service';
import { IFriend } from 'src/data/IFriend';
import { IPangolin } from 'src/data/IPangolin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
})
export class FriendsListComponent {
  @Input('pangolin_username')
  pangolin_username: string | undefined;

  list_friend: IFriend[] | undefined = [];
  list_friend_filtered:
    | { username: string; id: string | undefined }[]
    | undefined;
  current_user!: IPangolin;

  fa_plus_circle = faPlusCircle;
  fa_delete_left = faTrash;

  constructor(
    private pangolin_service: PangolinService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.current_user = JSON.parse(localStorage.getItem('pangolin')!);
    this.pangolin_service
      .AllFriend(this.pangolin_username!)
      .subscribe((data) => {
        this.list_friend = data;
        this.list_friend_filtered = data?.map((friend) => {
          let filter =
            friend.username_1 == this.pangolin_username
              ? { username: friend.username_2, id: friend.id }
              : { username: friend.username_1, id: friend.id };

          return filter;
        });
      });
  }

  GoToFridnProfile = (friend_username: string) => {
    this.router.navigate(['/pangolin', friend_username]);
  };

  RemoveFriend = (friend_username: string) => {
    console.log(friend_username);

    this.pangolin_service.RemoveFriend(friend_username).subscribe(() => {
      location.reload();
    });
  };
}
