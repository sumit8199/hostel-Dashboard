import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StatCardItem {
  title: string;
  total: number;
  active?: number;
  inactive?: number;
  color?: string; // header background color
}

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  @Input() items: StatCardItem[] = [
    { title: 'Hostel Admin Count', total: 5, active: 0, inactive: 1, color: '#674D9F' },
    { title: 'Hostel Staff Count', total: 10, active: 10, inactive: 0, color: '#674D9F' },
    { title: 'Hostel Students Count', total: 200, active: 150, inactive: 50, color: '#674D9F' },
  ];

  padTwo(n: number): string {
    return n.toString().padStart(2, '0');
  }

  percent(part: number | undefined, total: number | undefined): number {
    if (!total || total <= 0 || !part) return 0;
    const p = Math.round((part / total) * 100);
    return Math.min(100, Math.max(0, p));
  }
}
