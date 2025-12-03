import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  getUsers(page: number = 1, limit: number = 5): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return users.slice(startIndex, endIndex);
      })
    );
  }
}
