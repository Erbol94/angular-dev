import { Component } from '@angular/core';
import { HeaderComponent } from "../widgets/header/header.component";
import { NavbarComponent } from "../widgets/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../widgets/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'smart-customs';
}
