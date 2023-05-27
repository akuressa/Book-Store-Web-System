import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private headers: HttpHeaders;
  private headersWithoutContentType: HttpHeaders;
  private apiUrl = 'http://localhost:8000/api';
  private authorId = 0;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.getHeaders();
    this.headersWithoutContentType = this.authService.getHeadersForFormData();
    this.authorId = this.authService.getAuthorId();
  }

  bookList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/author/${this.authorId}/books`, { headers: this.headers });
  }

  addBook(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/author/${this.authorId}/add_book`, formData, { headers: this.headersWithoutContentType });
  }
}

