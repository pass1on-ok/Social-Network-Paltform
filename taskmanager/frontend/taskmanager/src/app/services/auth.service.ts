import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  

  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    
  }

/*
constructor(private http: HttpClient, private router: Router) {
  this.currentUserSubject = new BehaviorSubject<User | null>(null); 
  this.currentUser = this.currentUserSubject.asObservable();
}*/

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser;
  }

  login(email: string, password: string): Observable<User> {
    console.log('Login data:', { email, password });
    
    return this.http.post<any>(`${this.apiUrl}users/login/`, { user: { email, password } })
      .pipe(
        tap(
          (response: any) => {
            if (response && response.user) {
              const user: User = {
                id: response.user.id,
                email: response.user.email,
                name: response.user.username,
                token: response.user.token
              };
              if (response.user.password) {
                user.password = response.user.password;
              }
              /*
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              */
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              this.router.navigate(['profile']);
            } else {
              console.error('Unexpected server response:', response);
            }
          },
          error => {
            console.error('Login error:', error);
          }
        )
        
        
      );
    
      
  }
  
  
  
  logout(): Observable<void> {
    
    const token = this.currentUserValue?.token;
    
  
    if (!token) {
      console.error('No token found for logout');
      return of(undefined);
    }
  
    const headers = {
      'Authorization': `Token ${token}`
    };
  
    return this.http.post<void>(`${this.apiUrl}users/logout/`, {}, { headers })
      .pipe(
        tap(() => {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
          this.router.navigate(['/login']);
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}users/`, { user: { username, email, password } });
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}user/`, user)
      .pipe(
        tap(updatedUser => {
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
        })
      );
  }

  deleteUser(id: number): Observable<void> {
    const token = this.currentUserValue?.token;
  
    if (!token) {
      console.error('No token found for user deletion');
      return of(undefined);
    }
  
    const headers = {
      'Authorization': `Token ${token}`
    };
  
    return this.http.delete<void>(`${this.apiUrl}users/${id}/`, { headers })
      .pipe(
        tap(() => {
          if (this.currentUserValue && this.currentUserValue.id === id) {
            this.logout();
          }
        })
      );
  }
}
