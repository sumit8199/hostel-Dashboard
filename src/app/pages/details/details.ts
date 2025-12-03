import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  private router = inject(Router);
  private userService = inject(UserService);

  user: any | null = null;
  exportOpen = false;
  active = true;

  constructor() {
    const nav = this.router.currentNavigation();
    const stateUser = nav?.extras?.state?.['user'];
    if (stateUser) {
      this.user = stateUser;
      this.active = !!stateUser.active;
    }
  }

  goBack() {
    // Navigate back to users page
    // We use replaceUrl to ensure proper navigation state
    this.router.navigate(['/users']);
  }

  public formatPhoneNumber(value: string | number): string {
    if (!value) return '';
    let str = value.toString().trim();
    str = str.replace(/(ext\.?|x)\s*\d+$/i, '').trim();
    let digits = str.replace(/\D/g, '');
    if (digits.length === 10) {
      return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
    }

    if (digits.length === 11 && digits.startsWith('1')) {
      return `+1 (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7)}`;
    }

    if (digits.length === 12 && digits.startsWith('91')) {
      const p = digits.substring(2);
      return `+91 ${p.substring(0, 5)} ${p.substring(5)}`;
    }
    return digits;
  }

  toggleExport() { this.exportOpen = !this.exportOpen; }
  closeExport() { this.exportOpen = false; }
  toggleActive() { this.active = !this.active; }
}
