import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private headers: HttpHeaders;
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.getHeaders();
  }
  bookList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/booksWithAuthors`, { headers: this.headers });
  }

  authorList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/authors`, { headers: this.headers });
  }

  activate_author(authorId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/author/${authorId}/activate`, {}, { headers: this.headers });
  }

  deactivate_author(authorId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/author/${authorId}/deactivate`, {}, { headers: this.headers });
  }

  searchBooks(searchTerm: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/searchBooks?key=${searchTerm}`, { headers: this.headers });
  }
}

