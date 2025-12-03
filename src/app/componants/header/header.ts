import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  showDropdown = false;
  @Input() isActive: any;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
