// src/app/item-list/item-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag'; // Importando NzTagModule
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal'; // Importando NzModalModule
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message'; // Importando NzMessageModule
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ItemService } from '../item.service';
import { NullToNAPipe } from '../null-to-na.pipe'; // Importando o pipe standalone

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzCheckboxModule,
    NzTagModule,
    NzModalModule,
    NzMessageModule,
    NullToNAPipe
  ],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];

  constructor(
    private itemService: ItemService,
    private modal: NzModalService,        // Injeção do NzModalService
    private message: NzMessageService     // Injeção do NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.items = this.itemService.getItems();
  }

  onEdit(index: number): void {
    window.location.href = `/form?index=${index}`;
  }

  onDelete(index: number): void {
    this.modal.confirm({
      nzTitle: 'Confirmar Exclusão',
      nzContent: 'Tem certeza de que deseja excluir este item?',
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.itemService.removeItem(index);
        this.loadItems();
        this.message.success('Item excluído com sucesso.');
      },
      nzCancelText: 'Não'
    });
  }

  onAdd(): void {
    window.location.href = '/form';
  }
}
