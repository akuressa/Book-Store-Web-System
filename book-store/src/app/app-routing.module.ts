import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ManageAuthorComponent } from './manage-author/manage-author.component';
import { AddBooksComponent } from './add-books/add-books.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthorBookListComponent } from './author-book-list/author-book-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'manage-author', component: ManageAuthorComponent },
    { path: 'add-book', component: AddBooksComponent },
    { path: 'view-books', component: SearchBooksComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'book-list', component: AuthorBookListComponent },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
