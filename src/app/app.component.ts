import { Component } from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideMenuComponent, RouterOutlet],
  template: `<app-side-menu></app-side-menu>`,
})
export class AppComponent {}
