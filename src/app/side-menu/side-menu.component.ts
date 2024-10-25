import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [NzLayoutModule, NzMenuModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SideMenuComponent {}
