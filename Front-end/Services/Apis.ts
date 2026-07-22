// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:7023';
  private readonly usernameKey = 'username';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { withCredentials: true }).pipe(
      tap((res: any) => {
        // Only the username is stored client-side — never the token itself.
        localStorage.setItem(this.usernameKey, res.username);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => localStorage.removeItem(this.usernameKey))
    );
  }

  checkAuth(): Observable<boolean> {
    const username = localStorage.getItem(this.usernameKey);
    if (!username) {
      return of(false); // no known user, don't even bother calling the API
    }

    return this.http.get(`${this.apiUrl}/exists/${username}`, { withCredentials: true }).pipe(
      map(() => true),
      catchError(() => of(false)) // 401 (or any error) → not logged in
    );
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-profile`, { withCredentials: true });
  }
}