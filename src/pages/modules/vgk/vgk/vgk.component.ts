import { Component, SimpleChanges, ViewChild, inject } from '@angular/core';
import { TableComponent } from '../../../../widgets/table/table.component';
import { FakeApiService } from './fake-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { NgIf } from '@angular/common';
import { UiSelectComponent } from './ui/ui-select/ui-select.component';
import { UiDatepickerComponent } from './ui/ui-datepicker/ui-datepicker.component';
import { UiRadioButtonComponent } from './ui/ui-radio-button/ui-radio-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from "../../../../shared/services/auth.service";
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-vgk',
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
  templateUrl: './vgk.component.html',
  styleUrl: './vgk.component.scss',
})
export class VgkComponent {

  submit(): void {}

  constructor(private router: Router) {

  }

  // Переход на страницу vgk-add
  navigateToAddNew() {
    this.router.navigate(['/vgk-add']);
  }
  // Переход на страницу vgk-add

  // скрыть и отркыть филтрацию
  isElementVisible: boolean = false;
  rotateClass: string = '';

  toggleElement() {
    this.isElementVisible = !this.isElementVisible;
    this.rotateClass = this.isElementVisible ? 'rotate-element' : '';
  }

  // скрыть и отркыть филтрацию

  // Таблица и пагинация
  service: FakeApiService = inject(FakeApiService);
  dataSource!: MatTableDataSource<any>;
  trailerNumber: string = '';

  displayedColumns = [
    'id',
    'trailerNumber',
    'violation',
    'weighingType',
    'transportNumber',
    'totalWeight',
    'creatingDate',
    'status',
    'photo.fileName',
    'customsDepartment.fullName',
    'weightSystem.name'
  ];

  pageSize = 8;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = false;

  urlProduct = 'http://192.168.0.82:8080/smart-customs/ws/rest/com.axelor.apps.registration.db.Vgk/search';

  bodyProduct = {
      fields: [
        'weightSystem',
        'trailerNumber',
        'violation',
        'weighingType',
        'transportNumber',
        'totalWeight',
        'photo',
        'creatingDate',
        'status',
        'customsDepartment',
      ],
      sortBy: null,
      data: {
        _domain: null,
        _domainContext: {
          _id: null,
          _model: 'com.axelor.apps.registration.db.Vgk',
        },
        operator: 'and',
        criteria: [],
      },
      limit: 100,
      offset: 0,
      translate: true,
    };

  // Таблица и пагинация

  // UI-select
  selectedValue: any;
  statusOptions = [
    { value: 0, label: '' },
    { value: 1, label: 'Офорлено' },
    { value: 2, label: 'Не оформлено' },
  ];

  onSelectedValueChange(selectedValue: any) {
    this.selectedValue = selectedValue;
    // console.log(this.selectedValue);
  }

  // UI-select

  // UI-datepicker

  startDate: Date | undefined;
  endDate: Date | undefined;

  onStartDateChange(selectedDate: Date) {
    this.startDate = selectedDate;
    console.log('Начало года:', this.startDate);
  }

  onEndDateChange(selectedDate: Date) {
    this.endDate = selectedDate;
    console.log('Конец года:', this.endDate);
  }

  // UI-datepicker

  // UI-radio-button

  selectedOption: any;

  options = [
    { value: 1, label: 'До 45 мин' },
    { value: 2, label: 'От 45 мин' },
  ];

  onOptionChange(selectedOption: any) {
    this.selectedOption = selectedOption;
    console.log('Selected option:', this.selectedOption);
  }

  // UI-radio-button


}
