/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, RouterEvent } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  active = '';

  NAV = [
    {
      name: 'About',
      link: '/nav/about',
      icon: 'person-circle'
    },
    {
      name: 'Logout',
      link: '/login',
      icon: 'exit'
    }
  ];

  constructor(public storage: Storage,private router: Router) {
    this.storage.create();
    this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url;
    });

    }
}

