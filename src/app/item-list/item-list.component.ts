import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { ItemService } from '../item.service';
import { NullToNAPipe } from '../null-to-na.pipe';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
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
  displayedItems: any[] = [];
  pageSize = 5;
  pageIndex = 1;

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
    this.updateDisplayedItems();
  }

  updateDisplayedItems(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedItems = this.items.slice(startIndex, endIndex);
  }

  onPageChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateDisplayedItems();
  }

  onEdit(index: number): void {
    const globalIndex = (this.pageIndex - 1) * this.pageSize + index;
    window.location.href = `/form?index=${globalIndex}`;
  }

  onDelete(index: number): void {
    const globalIndex = (this.pageIndex - 1) * this.pageSize + index;
    this.modal.confirm({
      nzTitle: 'Confirmar Exclusão',
      nzContent: 'Tem certeza de que deseja excluir este item?',
      nzOkText: 'Sim',
      nzOkType: 'dashed',
      nzOnOk: () => {
        this.itemService.removeItem(globalIndex);
        this.loadItems(); // Recarregar itens após a exclusão
        this.message.success('Item excluído com sucesso.');

        // Se o número de itens na página atual for zero após a exclusão,
        // volte para a página anterior
        if (this.displayedItems.length === 0 && this.pageIndex > 1) {
          this.pageIndex--;
          this.updateDisplayedItems();
        }
      },
      nzCancelText: 'Não'
    });
  }

  onAdd(): void {
    window.location.href = '/form';
  }
}
