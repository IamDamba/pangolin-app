import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PangolinService } from '../pangolin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
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

  Register = (register: any) => {
    console.log('ok');

    let form = {
      username: register.form.controls.username.value,
      password: register.form.controls.password.value,
    };

    if (form.username.length && form.password.length) {
      this.pangolin_service
        .Register(form.username, form.password)
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
