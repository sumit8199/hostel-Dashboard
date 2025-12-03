import { Routes } from '@angular/router';
import { User } from './pages/user/user';
import { Details } from './pages/details/details';
import { EditForm } from './pages/edit-form/edit-form';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: User },
  { path: 'details', component: Details },
  { path: 'edit-form', component: EditForm },
  { path: '**', redirectTo: '/users' }
];
