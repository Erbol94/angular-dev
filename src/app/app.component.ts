import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from "@angular/material/sidenav";
import {FormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../widgets/header/header.component";
import {NavbarComponent} from "../widgets/navbar/navbar.component";
import {Router, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../widgets/footer/footer.component";
import {AuthService} from "../shared/services/auth.service";
import {StorageService} from "../shared/services/storage.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
    MatListModule,MatIconModule,FormsModule,CommonModule,MatSidenavModule,MatButtonModule,MatToolbarModule,MatMenuModule,MatBadgeModule,MatRadioModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
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
