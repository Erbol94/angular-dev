import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatBadgeModule} from "@angular/material/badge";
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from "@angular/forms";
import {StorageService} from "../../shared/services/storage.service";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {MatListModule} from '@angular/material/list';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,MatRadioModule,MatBadgeModule,MatSidenavModule,MatMenuModule,MatButtonModule,MatIconModule,MatToolbarModule,FormsModule,MatListModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  title = 'Смарт Бажы'
  isExpanded = false;
  favoriteSeason: string = '';
  isLoggedIn = false;


  constructor(private storageService: StorageService, private authService: AuthService, private router : Router) {

  }
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
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  seasons: string[] = ['Русский', 'English', 'Кыргыз тили'];
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
  isDrawerExpanded = false;

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
