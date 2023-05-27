import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-author',
  templateUrl: './manage-author.component.html',
  styleUrls: ['./manage-author.component.css']
})


export class ManageAuthorComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['authorName', 'email', 'status', 'action'];

  constructor(private http: HttpClient, private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.adminService.authorList()
      .subscribe(
        (response) => {
          this.dataSource = new MatTableDataSource<any>(response.data);
        },
        (error) => {
          console.error('Failed to fetch books', error);
        }
      );
  }

  activate(authorId: number): void {
    this.adminService.activate_author(authorId)
      .subscribe(
        (response) => {
          const author = this.dataSource.data.find(a => a.id === authorId);
          author.is_active = 1;
          this.dataSource.data = [...this.dataSource.data];
        },
        (error) => {
          console.error('Failed to update author status', error);
        }
      );
    }

  deactivate(authorId: number): void {

    this.adminService.deactivate_author(authorId)
      .subscribe(
        (response) => {
          const author = this.dataSource.data.find(a => a.id === authorId);
          author.is_active = 0;
          this.dataSource.data = [...this.dataSource.data];
        },
        (error) => {
          console.error('Failed to update author status', error);
        }
      );
  }
}
