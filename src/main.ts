import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { AppComponent } from './app/app.component';
import { ItemListComponent } from './app/item-list/item-list.component';
import { ItemFormComponent } from './app/item-form/item-form.component';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { MenuOutline } from '@ant-design/icons-angular/icons';

const routes: Routes = [
  { path: 'list', component: ItemListComponent },
  { path: 'form', component: ItemFormComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule, HttpClientModule, NzIconModule),
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: NZ_ICONS, useValue: [MenuOutline] }
  ],
}).catch(err => console.error(err));
