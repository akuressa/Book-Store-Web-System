import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedIn = false ;
  roleType = "";

  constructor ( private authService: AuthService) { }
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });
    this.authService.roleType$.subscribe(roleType => {
      this.roleType = roleType;
    });
  }
}
