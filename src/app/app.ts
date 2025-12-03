import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './componants/navbar/navbar';
import { Header } from './componants/header/header';
// import { User } from './pages/user/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  sidebarOpen = true;

  onSidebarToggled(open: boolean) {
    this.sidebarOpen = open;
  }
}
