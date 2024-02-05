import { Component, inject } from '@angular/core';
import { TableComponent } from './table/table.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { NgClass, NgIf } from '@angular/common';
import { UiSelectComponent } from '../vgk/ui/ui-select/ui-select.component';
import { UiDatepickerComponent } from '../vgk/ui/ui-datepicker/ui-datepicker.component'; 
import { UiRadioButtonComponent } from '../vgk/ui/ui-radio-button/ui-radio-button.component'; 
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FakeApiService } from '../vgk/fake-api.service';

@Component({
  selector: 'app-vgk-axis',
  standalone: true,
  imports: [
    TableComponent,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    NgIf,
    UiSelectComponent,
    UiDatepickerComponent,
    UiRadioButtonComponent,
    NgClass,
  ],
  templateUrl: './vgk-axis.component.html',
  styleUrl: './vgk-axis.component.scss'
})
export class VgkAxisComponent {

  submit(): void {}

  constructor(private router: Router) {

  }

  // Переход на страницу vgk-add
  navigateToAddNew() {
    this.router.navigate(['/vgk-add']);
  }
  // Переход на страницу vgk-add

 
  // Таблица и пагинация
  service: FakeApiService = inject(FakeApiService);
  dataSource!: MatTableDataSource<any>;
  trailerNumber: string = '';


  displayedColumns = [
    'id',
    'loadAxis',
    'numberAxis',
    'overloadLoad',
    'permissibleLoad',
    'customsDepartment.fullName',
  ];

  pageSize = 8;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = false;

  urlProduct = 'http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.Axis/search';

  bodyProduct = {
      fields: [
        "permissibleLoad",
        "overloadLoad",
        "numberAxis",
        "loadAxis",
        "customsDepartment"
      ],
      sortBy: null,
      data: {
        _domain: null,
        _domainContext: {
          _id: null,
          _model: 'com.axelor.apps.registration.db.Axis',
        },
        operator: 'and',
        criteria: [],
      },
      limit: 100,
      offset: 0,
      translate: true,
    };

  // Таблица и пагинация


}
