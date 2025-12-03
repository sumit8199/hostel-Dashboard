import { Component, HostListener, inject, OnInit, OnDestroy } from '@angular/core';
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

  userCards: Array<{ role: string; name: string; id: number; phone: string; active: boolean }> = [];
  pageSize = 100; // show many cards without pagination
  enableInfiniteScroll = false; // keep disabled unless needed
  currentPage = 1;             // restore for internal state
  isLoading = false;           // restore to guard loadPage
  hasMore = false;             // no more pages when pagination removed

  constructor() { }

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

  loadPage(page: number) {
    if (this.isLoading) return;
    this.isLoading = true;

    this.userService.getUsers(1, this.pageSize).subscribe((users) => {
      const newUsers = (users || []).map((u, i) => ({
        role: 'ADMIN 01',
        name: u.name ?? 'Unknown',
        id: u.id ?? 0,
        phone: u.phone ?? '',
        active: i !== 3
      }));
      this.userCards = newUsers;
      this.currentPage = 1;
      this.hasMore = false;
      this.isLoading = false;
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
}
