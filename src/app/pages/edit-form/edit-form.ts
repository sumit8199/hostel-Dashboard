import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.css',
})
export class EditForm {

}
