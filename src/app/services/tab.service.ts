import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private selectedIndex: number = 0;

  getSelectedIndex(): number {
    return this.selectedIndex;
  }

  setSelectedIndex(index: number): void {
    this.selectedIndex = index;
  }
}
