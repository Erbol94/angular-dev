import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../widgets/header/header.component";
import {NavbarComponent} from "../../widgets/navbar/navbar.component";
import {Router, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../widgets/footer/footer.component";
import {AuthService} from "../../shared/services/auth.service";
import {StorageService} from "../../shared/services/storage.service";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
  ],
  providers: [AuthService, StorageService],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  isLoggedIn = false;
  isDrawerExpanded = false;
  constructor(private storageService: StorageService, private authService: AuthService, private router : Router) {}

  ngOnInit(): void {
    this.storageService.isAuthentication.subscribe({
      next: (value) => {
        if (value) {
          this.isLoggedIn = true;
        }
      },
    });
  }

  logout() {
    this.authService.onLogout();
    this.router.navigate(['/login']);
  }

  toggleDrawer() {
    this.isDrawerExpanded = !this.isDrawerExpanded;
  }

  openDrawer() {
    this.isDrawerExpanded = true;
  }

  closeDrawer() {
    this.isDrawerExpanded = false;
  }

}
