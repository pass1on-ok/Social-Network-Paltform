import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8000/postapi/posts/';  

  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<Post> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<Post>(url);
  }

  createPost(postData: any): Observable<any> {
    const url = `${this.apiUrl}`;
  
    // Получение токена из currentUser
    const currentUser = this.authService.currentUserValue;
  
    // Проверка наличия текущего пользователя и токена
    if (!currentUser || !currentUser.token) {
      console.error('No token found for post creation');
      return of(undefined);
    }
  
    // Извлечение токена
    const token = currentUser.token;
  
    // Установка заголовков
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    };
  
    return this.http.post<any>(url, postData, httpOptions)
      .pipe(
        tap(response => {
          console.log('Post created successfully:', response);
        })
      );
  }

  updatePost(id: number, post: Post): Observable<Post> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put<Post>(url, post);
  }

 
  deletePost(id: number): Observable<void> {
    const url = `${this.apiUrl}${id}/`;

    // Получение токена из currentUser
    const currentUser = this.authService.currentUserValue;

    // Проверка наличия текущего пользователя и токена
    if (!currentUser || !currentUser.token) {
      console.error('No token found for post deletion');
      return of(undefined);
    }

    // Извлечение токена
    const token = currentUser.token;

    // Установка заголовков
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    };

    return this.http.delete<void>(url, httpOptions)
      .pipe(
        tap(() => {
          console.log('Post deleted successfully');
        })
      );
  }

  // другие методы PostService
  getPostsByCategory(categoryId: number): Observable<Post[]> {
    const url = `${this.apiUrl}/category/${categoryId}/`;
    return this.http.get<Post[]>(url);
  }

}


