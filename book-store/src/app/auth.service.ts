import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private token: string = '';
  private isLoggedIn: boolean = false;
  private user_type = ""
  private id = 0

  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
    return headers;
  }

  getHeadersForFormData(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return headers;
  }

  setAuthorId(id: number): void {
    this.id = id;
  }

  getAuthorId(): number {
    return this.id;
  }

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private roleType = new BehaviorSubject<string>('');
  roleType$ = this.roleType.asObservable();

  loggedinStatus(role: string) {
    this.isLoggedInSubject.next(true);
    this.roleType.next(role);
    this.user_type = role
  }
  loggedOutStatus() {
    this.isLoggedInSubject.next(false);
    this.roleType.next('');
  }
  login(credentials: { email: string, password: string, userType: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  register(user: { username: string, email: string, userType: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  logout(): Observable<any> {
    if (this.user_type == 'admin') {
      return this.http.post<any>(`${this.apiUrl}/admin/logout`, {}, { headers: this.getHeaders() });
    } else if (this.user_type == 'author') {
      return this.http.post<any>(`${this.apiUrl}/author/logout`, {}, { headers: this.getHeaders() });
    } else {
      return this.http.post<any>(`${this.apiUrl}/visitor/logout`, {}, { headers: this.getHeaders() });
    }
  }

  searchBooks(searchTerm: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/searchBooksWithAuthors?key=${searchTerm}`, { headers: this.getHeaders() });
  }

  bookList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getBooksWithAuthors`);
  }

}
