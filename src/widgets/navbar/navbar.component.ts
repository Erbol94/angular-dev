import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {RouterLink} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {navbarData} from "./nav-data";
import {INavbarData} from "./helper";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,MatIconModule,MatListModule,CommonModule,MatSidenavModule,MatButtonModule,MatToolbarModule,RouterLink,MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isDrawerExpanded = false;
  // navData = navbarData;
  navData: INavbarData[] = navbarData;
  rotateClass: string = '';
  constructor() {
    // console.log(this.navData)
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

  toggleSubMenu(data: INavbarData) {
    data.isExpanded = !data.isExpanded;
  }

}
