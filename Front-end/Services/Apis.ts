import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5028';
  private readonly tokenKey = 'token';

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res: any) => {
        localStorage.setItem(this.tokenKey, res.token);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers: this.authHeaders() }).pipe(
      tap(() => localStorage.removeItem(this.tokenKey))
    );
  }

  checkAuth(): Observable<boolean> {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return of(false);
    }

    return this.http.get(`${this.apiUrl}/user-profile`, { headers: this.authHeaders() }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  getUserProfile(): Observable<any> {
      console.log('Calling /user-profile with headers:', this.authHeaders());
    return this.http.get(`${this.apiUrl}/user-profile`, { headers: this.authHeaders() });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { username, password }).pipe(
      catchError(error => of({ error }))
    );
  }
}