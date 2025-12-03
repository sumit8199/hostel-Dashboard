import { Component, Output, EventEmitter } from '@angular/core';
import { NavItem, NAVIGATION_ITEMS } from '../../core/navigation.constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  sidebarOpen = true;

  // load constant menu
  navItems: NavItem[] = NAVIGATION_ITEMS;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarToggled.emit(this.sidebarOpen);
  }
}
