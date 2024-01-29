import { VgkServiceService } from './../../../../../shared/services/vgk-service/vgk-service.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {VgkServiceService} from "../../../../../shared/services/vgk-service/vgk-service.service";

@Component({
  selector: 'app-vgk-view',
  standalone: true,
  imports: [],
  templateUrl: './vgk-view.component.html',
  styleUrl: './vgk-view.component.scss'
})
export class VgkViewComponent {

  service: VgkServiceService = inject(VgkServiceService);

  url = 'http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.Vgk'

  constructor(private route: ActivatedRoute){
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.service.postDataById(this.url, id).subscribe((res) => console.log(res))
  }


}
