import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://127.0.0.1:8000/postapi/posts'; 
  private apiUrl1 = 'http://127.0.0.1:8000/postapi/'; 
  constructor(private http: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<Comment[]> {
    const url = `${this.apiUrl}/${postId}/comments/`;
    return this.http.get<Comment[]>(url);
  }
  
/*
  createComment(postId: number, body: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl1}comments/`, { body });
  }
  */

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

}