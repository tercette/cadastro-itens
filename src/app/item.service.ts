import { Injectable } from '@angular/core';
import { Item } from './Types/models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private storageKey = 'items';

  constructor() { }

  getItems(): Item[] {
    const itemsJson = localStorage.getItem(this.storageKey);
    return itemsJson ? JSON.parse(itemsJson) : [];
  }
  addItem(item: Item): void {
    const items = this.getItems();
    items.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  updateItem(index: number, updatedItem: Item): void {
    const items = this.getItems();
    if (items[index]) {
      items[index] = updatedItem;
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
  }

  removeItem(index: number): void {
    const items = this.getItems();
    if (items[index]) {
      items.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
  }
}
