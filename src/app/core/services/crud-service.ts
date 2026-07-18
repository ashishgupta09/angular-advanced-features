import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserClone } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  getUsers(): Observable<UserClone[]> {
    return this.http.get<UserClone[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<UserClone> {
    return this.http.get<UserClone>(`${this.apiUrl}/${id}`);
  }

  createUser(user: UserClone): Observable<UserClone> {
    return this.http.post<UserClone>(this.apiUrl, user);
  }

  deleteUser(id: string): Observable<UserClone> {
    return this.http.delete<UserClone>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, user: UserClone) {
    return this.http.put<UserClone>(`${this.apiUrl}/${id}`, user);
  }
}
