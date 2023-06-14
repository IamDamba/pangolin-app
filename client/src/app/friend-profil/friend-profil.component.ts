import { IPangolin } from 'src/data/IPangolin';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PangolinService } from '../pangolin.service';

@Component({
  selector: 'app-friend-profil',
  templateUrl: './friend-profil.component.html',
})
export class FriendProfilComponent implements OnInit {
  friend_user: IPangolin | undefined;
  constructor(
    private router: ActivatedRoute,
    private pangolin_service: PangolinService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.pangolin_service
      .OneFriend(this.router.snapshot.paramMap.get('username'))
      .subscribe((data) => {
        this.friend_user = data;
      });
  }
}
