import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableComponent } from './table/table.component';

export interface PhotoRecording {
  createTime: string;
  createdOn: number;
  id: number;
  recordingMethod: string;
  vehicleNumber: string;
  camera: {
    name: string;
    id: number;
  };
  version: number;
}

@Component({
  selector: 'app-photo-recording',
  standalone: true,
  imports: [FormsModule, TableComponent],
  templateUrl: './photo-recording.component.html',
  styleUrl: './photo-recording.component.scss',
})
export class PhotoRecordingComponent {
  constructor(private router: Router) {}

  // Таблица и пагинация
  dataSource!: MatTableDataSource<PhotoRecording>;
  vehicleNumber: string = '';

  displayedColumns = [
    'id',
    'createTime',
    'vehicleNumber',
    'snapshotTime',
    'camera.name',
    'recordingMethod',
    'createdOn',
  ];

  pageSize = 8;
  pageIndex = 0;
  showFirstLastButtons = false;

  urlProduct =
    'http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.PhotoRecording/search';

  bodyProduct = {
    fields: [
      'createTime',
      'vehicleNumber',
      'snapshotTime',
      'camera',
      'recordingMethod',
      'createdOn',
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

  // Таблица и пагинация

  // Переход на страницу photo-recording-add
  navigateToAddNew() {
    this.router.navigate(['/photo-recording-add']);
  }
  // Переход на страницу photo-recording-add

  // скрыть и отркыть филтрацию
  isElementVisible: boolean = false;
  rotateClass: string = '';

  toggleElement() {
    this.isElementVisible = !this.isElementVisible;
    this.rotateClass = this.isElementVisible ? 'rotate-element' : '';
  }

  // скрыть и отркыть филтрацию
}
