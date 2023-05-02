import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNav = true;
  pageId: string = 'list';

  updateNavState(state: boolean) {
    this.showNav = state;
  }

  updatePageId(pageId: string) {
    this.pageId = pageId;
  }
}
