import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNav = true;

  constructor(private router: Router) {
    //session storage garbage collector (will be removed with firebase implementation)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!this.router.url.includes('add')) {
          sessionStorage.removeItem('add-device');
          sessionStorage.removeItem('compare-device');
        }
      }
    })
  }

  updateNavState(state: boolean) {
    this.showNav = state;
  }
}
