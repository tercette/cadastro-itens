import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private storageKey = 'cadastro-itens';

  constructor() {}

  getItems(): any[] {
    const items = localStorage.getItem(this.storageKey);
    return items ? JSON.parse(items) : [];
  }

  saveItems(items: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  addItem(item: any): void {
    const items = this.getItems();
    items.push(item);
    this.saveItems(items);
  }

  updateItem(index: number, item: any): void {
    const items = this.getItems();
    if (index >= 0 && index < items.length) {
      items[index] = item;
      this.saveItems(items);
    }
  }

  deleteItem(index: number): void {
    const items = this.getItems();
    if (index >= 0 && index < items.length) {
      items.splice(index, 1);
      this.saveItems(items);
    }
  }
}
