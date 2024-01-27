import { Component, inject } from '@angular/core';
import {BreadcrumbComponent} from "../../../widgets/breadcrumb/breadcrumb.component";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-vgk-view',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './vgk-view.component.html',
  styleUrl: './vgk-view.component.scss'
})
export class VgkViewComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  routeConfig = this.route.routeConfig?.path

  constructor() {
   console.log(this.route.parent)

  }


}
