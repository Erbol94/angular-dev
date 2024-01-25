import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from '@angular/material/list';
import {CommonModule} from "@angular/common";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule,MatListModule,CommonModule,MatSidenavModule,MatIconModule,MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
