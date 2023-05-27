import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-author-book-list',
  templateUrl: './author-book-list.component.html',
  styleUrls: ['./author-book-list.component.css']
})
export class AuthorBookListComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'cover_image', 'description'];
  isExpanded = false;
  selectedBookId = 0

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.fetchBooks();
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

  fetchBooks(): void {
    this.authorService.bookList()
    .subscribe(
      response => {
        this.dataSource = response.data
      },
      error => {

      }
    );
  }
}
