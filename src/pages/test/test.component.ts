import { Component } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    MatSidenavModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

}
