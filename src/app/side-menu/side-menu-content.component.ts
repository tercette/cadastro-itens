import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-side-menu-content',
  standalone: true,
  imports: [CommonModule, NzMenuModule, RouterModule],
  template: `
    <nz-menu nzTheme="dark" nzMode="inline" (nzClick)="onMenuClick()">
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SideMenuContentComponent {
  constructor(private drawerRef: NzDrawerRef) {}

  onMenuClick(): void {
    this.drawerRef.close();
  }
}
