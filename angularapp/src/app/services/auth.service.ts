import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://8080-aeaadfacfbfcbdbdddeeefcbbdfefcbfbfaadecbbecc.premiumproject.examly.io/api'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    console.log(body)
    return this.http.post<any>(`${this.baseUrl}/auth/login`, body).pipe(
      tap((user) => this.storeUserData(user)),
      catchError(this.handleError<any>('login'))
    );
  }

  register(username: string, password: string, role: string): Observable<any> {
    const body = { username, password, role };
    return this.http.post<any>(`${this.baseUrl}/register`, body).pipe(
      tap((user) => this.storeUserData(user)),
      catchError(this.handleError<any>('register'))
    );
  }

  isLoggedIn(): boolean {
    // Check if the user token exists in localStorage
    return !!localStorage.getItem('userToken');
  }

  getUserRole(): string {
    // Get the user role from localStorage
    const role=localStorage.getItem('userRole') || '{}';
    console.log(role)
    return role;
  }

  logout(): void {
    // Clear the user data from localStorage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
  }

  private storeUserData(user: any): void {
    // Save the user token and role in localStorage
    localStorage.setItem('userToken', user.token);
    localStorage.setItem('userRole', user.role);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Handle the error (you can log it or perform other actions)
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
