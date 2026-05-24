import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Crud {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  // GET USERS

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  // ADD USER

  addUser(payload: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, payload);
  }

  // UPDATE USER

  updateUser(id: string, payload: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, payload);
  }

  // DELETE USER

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
