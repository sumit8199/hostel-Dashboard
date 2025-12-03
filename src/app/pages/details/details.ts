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

  toggleExport() { this.exportOpen = !this.exportOpen; }
  closeExport() { this.exportOpen = false; }
  toggleActive() { this.active = !this.active; }
}
