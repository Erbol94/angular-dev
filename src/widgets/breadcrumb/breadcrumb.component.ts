import {Component, OnInit, Input, SimpleChange} from '@angular/core';
import {Router, RouterModule, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot} from "@angular/router";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule,RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input () routeConfig!: any | undefined;

  breadcrumbs: { label: string, url: string }[] = [];

  constructor() {
  }

}
