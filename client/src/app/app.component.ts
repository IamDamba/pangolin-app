import { IPangolin } from 'src/data/IPangolin';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  is_logged: boolean = false;

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.is_logged =
      localStorage.getItem('pangolin') &&
      localStorage.getItem('pangolin')?.length
        ? true
        : false;
  }

  Disconnect = () => {
    localStorage.clear();
    localStorage.clear();
    location.replace('');
  };
}
