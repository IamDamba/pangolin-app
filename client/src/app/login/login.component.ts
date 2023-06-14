import { Component, OnInit } from '@angular/core';
import { PangolinService } from '../pangolin.service';
import { IPangolin } from 'src/data/IPangolin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(
    private pangolin_service: PangolinService,
    private route: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (
      localStorage.getItem('pangolin') &&
      localStorage.getItem('pangolin')?.length
    ) {
      this.route.navigate(['home']);
    }
  }

  Login = (login: any) => {
    let form = {
      username: login.form.controls.username.value,
      password: login.form.controls.password.value,
    };

    if (form.username.length && form.password.length) {
      this.pangolin_service
        .Login(form.username, form.password)
        .subscribe(() => {
          if (
            localStorage.getItem('pangolin') &&
            localStorage.getItem('pangolin')?.length
          ) {
            location.replace('/home');
          }
        });
    }
  };
}
