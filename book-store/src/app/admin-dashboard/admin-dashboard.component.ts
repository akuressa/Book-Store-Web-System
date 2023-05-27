import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  searchTerm: string = "";
  displayedColumns: string[] = ['title', 'cover_image', 'username'];

  constructor(private http: HttpClient, private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchAuthorsWithBooks();
  }

  fetchAuthorsWithBooks(): void {
    this.adminService.bookList()
      .subscribe(
        (response) => {
          this.dataSource = new MatTableDataSource<any>(response.data);
        },
        (error) => {
          console.error('Failed to fetch books', error);
        }
      );
  }

  getImageUrl(filePath: string): string {
    return 'http://localhost:8000/' + filePath;
  }

  searchBooks() {
    this.adminService.searchBooks(this.searchTerm)
      .subscribe(
        (response) => {
          this.dataSource = new MatTableDataSource<any>(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
