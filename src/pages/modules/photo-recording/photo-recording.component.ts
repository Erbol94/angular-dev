import { Component, inject } from '@angular/core';
import { TableComponent } from './table/table.component';
import { FakeApiService } from '../vgk/vgk/fake-api.service';


@Component({
  selector: 'app-photo-recording',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './photo-recording.component.html',
  styleUrl: './photo-recording.component.scss'
})
export class PhotoRecordingComponent {

  service: FakeApiService = inject(FakeApiService);
  dataSource: any;

  url = 'http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.PhotoRecording/search';
  bodyProduct = {
    fields: [
      "createTime",
      "vehicleNumber",
      "snapshotTime",
      "camera",
      "recordingMethod",
      "createdOn"
    ],
    sortBy: null,
    data: {
      _domain: null,
      _domainContext: {
        _id: null,
        _model: 'com.axelor.apps.registration.db.PhotoRecording',
      },
      operator: 'and',
      criteria: [],
    },
    limit: 100,
    offset: 0,
    translate: true,
  };

  constructor(){  
  }


}
