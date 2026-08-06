// AuthService.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { environment } from '../src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private readonly tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password }).pipe(
      tap((res: any) => localStorage.setItem(this.tokenKey, res.token))
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}).pipe(tap(() => localStorage.removeItem(this.tokenKey)));
  }

  checkAuth(): Observable<boolean> {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) { return of(false); }

    return this.http.get(`${this.baseUrl}/user-profile`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user-profile`);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, { username, password }).pipe(
      catchError(error => of({ error }))
    );
  }
}