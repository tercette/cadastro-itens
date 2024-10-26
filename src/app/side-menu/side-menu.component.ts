// src/app/side-menu.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SideMenuDrawerContentComponent } from './side-menu-drawer-content.component'; // Ajuste o caminho conforme necessário
import { SideMenuSidebarComponent } from './side-menu-sidebar.component'; // Novo componente para o sidebar

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzDrawerModule,
    NzButtonModule,
    NzIconModule,
    RouterModule,
    SideMenuDrawerContentComponent,
    SideMenuSidebarComponent,
    HttpClientModule,
  ],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  showHamburger = false;
  isCollapsed = true;

  constructor(private drawerService: NzDrawerService) {}

  ngOnInit(): void {
    this.updateMenuState();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updateMenuState();
  }

  private updateMenuState(): void {
    this.showHamburger = window.innerWidth < 400;
  }

  openDrawer(): void {
    this.drawerService.create({
      nzTitle: 'Menu',
      nzPlacement: 'left',
      nzClosable: true,
      nzContent: SideMenuDrawerContentComponent,
      nzWidth: 200,
    });
  }

  onCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
