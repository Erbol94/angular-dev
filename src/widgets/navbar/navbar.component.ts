import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,MatListModule,CommonModule,MatSidenavModule,MatButtonModule,MatToolbarModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

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
