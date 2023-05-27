import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent {
  dataTableData: any = [];
  searchTerm: string = "";
  isExpanded = false;
  selectedBookId = 0;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.getDataTableData();
  }

  getImageUrl(filePath: string): string {
    return 'http://localhost:8000/' + filePath;
  }
  showMore(id: number) {
    this.isExpanded = true;
    this.selectedBookId = id;
  }

  showLess(id: number) {
    this.isExpanded = false;
    this.selectedBookId = id;
  }

  getDataTableData(): void {
    this.authService.bookList()
      .subscribe(
        (response) => {
          this.dataTableData = response.data;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  searchBooks() {
    this.authService.searchBooks(this.searchTerm)
      .subscribe(
        (response) => {
          this.dataTableData = response.data;
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
