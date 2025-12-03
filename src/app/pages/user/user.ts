import { Component, HostListener, inject, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, signal } from '@angular/core';
import { StatCard } from '../../componants/stat-card/stat-card';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, StatCard, RouterModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class User implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private router = inject(Router);
  private routerSubscription?: Subscription;
  private isInitialLoad = true; // Track if this is the first load

  dropdownOpen = false;
  categories = ['Hostel Admins', 'Hostel Staff', 'Hostel Students'];
  selectedCategory = this.categories[0];

  filters = ['All', 'Active', 'In-Active', 'Left Out'];
  selectedFilter: string = 'All';

  userCards = signal<Array<{ role: string; name: string; id: number; phone: string; active: boolean }>>([]);
  pageSize = 100; // show many cards without pagination
  enableInfiniteScroll = false; // keep disabled unless needed
  currentPage = 1;             // restore for internal state
  isLoading = false;           // restore to guard loadPage
  hasMore = false;             // no more pages when pagination removed

  constructor() { }

  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    // Load cards initially
    this.loadPage(1);

    // Subscribe to router events to reload cards when navigating back to this component
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url === '/users' || event.urlAfterRedirects === '/users') {
          // Skip the initial navigation (already loaded above)
          if (this.isInitialLoad) {
            this.isInitialLoad = false;
            return;
          }
          // Reload the cards when navigating back to users page
          console.log('Reloading user cards after navigation');
          this.loadPage(1);
        }
      });
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
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


  loadPage(page: number) {
    if (this.isLoading) return;
    this.isLoading = true;

    this.userService.getUsers(1, this.pageSize).subscribe((users) => {
      const newUsers = (users || []).map((u, i) => ({
        role: 'ADMIN 01',
        name: u.name ?? 'Unknown',
        id: u.id ?? 0,
        phone: u.phone || '9876543210',
        active: i !== 3
      }));
      this.userCards.set(newUsers);
      this.currentPage = 1;
      this.hasMore = false;
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  // Remove pagination methods temporarily


  // Optional infinite scroll (disabled by default)
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (!this.enableInfiniteScroll) return;
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    if (pos >= max - 100 && !this.isLoading && this.hasMore) {
      this.loadPage(this.currentPage + 1);
    }
  }

  // Pagination controls
  nextPage() {
    if (this.isLoading || !this.hasMore) return;
    this.loadPage(this.currentPage + 1);
  }

  prevPage() {
    if (this.isLoading || this.currentPage <= 1) return;
    this.loadPage(this.currentPage - 1);
  }

  toggleDropdown() { this.dropdownOpen = !this.dropdownOpen; }
  selectCategory(c: string) { this.selectedCategory = c; this.dropdownOpen = false; }
  selectFilter(f: string) { this.selectedFilter = f; }

  toggleStatus(u: { active: boolean }) {
    u.active = !u.active;
    // TODO: If backend supports, call API to persist change
    // this.userService.updateStatus(u.id, u.active).subscribe();
  }

  onToggleKey(event: KeyboardEvent, u: { active: boolean }) {
    const keys = ['Enter', ' '];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.toggleStatus(u);
    }
  }

  viewProfile(u: { id: number; name?: string; phone?: string; active?: boolean; role?: string }) {
    this.router.navigate(['/details'], { state: { user: u } });
  }

  deleteUser(u: { id: number }) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userCards.update(cards => cards.filter(c => c.id !== u.id));
      // TODO: Call API to delete user
      // this.userService.deleteUser(u.id).subscribe();
    }
  }
}
