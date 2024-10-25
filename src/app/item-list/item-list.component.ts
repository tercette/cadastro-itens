import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, NzCheckboxModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItemListComponent implements OnInit {
  items: any[] = [];

  constructor(
    private itemService: ItemService,
    private modal: NzModalService,
    private message: NzMessageService
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
      nzTitle: 'Você tem certeza que deseja excluir este item?',
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.itemService.deleteItem(index);
        this.loadItems();
        this.message.success('Item excluído com sucesso');
      },
      nzCancelText: 'Não'
    });
  }

  onAdd(): void {
    window.location.href = '/form';
  }
}
