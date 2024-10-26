import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-side-menu-drawer-content',
  standalone: true,
  imports: [CommonModule, NzMenuModule, RouterModule],
  template: `
    <nz-menu  nzMode="inline" (nzClick)="onMenuClick()">
      <nz-menu-item routerLink="/list">
        <span>📋</span>
        <span>Listagem</span>
      </nz-menu-item>
      <nz-menu-item routerLink="/form">
        <span>➕</span>
        <span>Cadastro</span>
      </nz-menu-item>
    </nz-menu>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [`
   .logo {
      height: 60px;
      color: white;
      text-align: center;
      font-size: 20px;
      line-height: 60px;
      background-color: #001529;
      font-weight: bold;
    }
  `]
})
export class SideMenuDrawerContentComponent {
  constructor(private drawerRef: NzDrawerRef) {}

  onMenuClick(): void {
    this.drawerRef.close();
  }
}
