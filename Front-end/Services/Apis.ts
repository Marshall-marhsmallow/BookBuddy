// AuthService.ts
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

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res: any) => localStorage.setItem(this.tokenKey, res.token))
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(tap(() => localStorage.removeItem(this.tokenKey)));
  }

  checkAuth(): Observable<boolean> {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) { return of(false); }

    return this.http.get(`${this.apiUrl}/user-profile`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-profile`);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { username, password }).pipe(
      catchError(error => of({ error }))
    );
  }
}