import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class Poet {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/posts';

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}`);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.url}`, post);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  updatePost(id: string, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.url}/${id}`, post);
  }
}
