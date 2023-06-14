import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { IPangolin } from 'src/data/IPangolin';
import { RoleList } from 'src/data/RoleList';
import { PangolinService } from '../pangolin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  // Variables
  list_roles: string[] = [];
  current_pangolin!: IPangolin;
  input_field: Object = {
    username: '',
    new_password: '',
    confirm_password: '',
    role: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pangolin_service: PangolinService
  ) {}

  // NgOnInit
  ngOnInit(): void {
    if (
      !localStorage.getItem('pangolin') ||
      (!localStorage.getItem('pangolin') &&
        !localStorage.getItem('pangolin')?.length)
    ) {
      this.router.navigate(['login']);
    }

    this.list_roles = Object.values(RoleList);
    this.current_pangolin = JSON.parse(
      localStorage.getItem('pangolin')!
    ) as IPangolin;

    console.log(Object.values(RoleList));
  }

  // Functions
  HandleSubmit = (form: NgForm) => {
    let fields = {
      username: form.value.username,
      new_password: form.value.new_password,
      confirm_password: form.value.confirm_password,
      role: form.value.role,
    };

    console.log(fields.role.length);

    if (
      fields.username.length >= 3 &&
      fields.new_password.length >= 3 &&
      fields.confirm_password.length >= 3 &&
      fields.role.length >= 3
    ) {
      if (fields.new_password === fields.confirm_password) {
        this.pangolin_service
          .UpdatePangolin(
            this.current_pangolin.id,
            fields.username,
            fields.confirm_password,
            fields.role
          )
          .subscribe((data) => {
            localStorage.setItem(
              'pangolin',
              JSON.stringify({
                id: data?.id,
                username: data?.username,
                role: data?.role,
              })
            );
            location.reload();
          });
      }
    }
  };
}
