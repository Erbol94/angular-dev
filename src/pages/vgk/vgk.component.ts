import { Component, ViewChild, inject } from '@angular/core';
import { TableComponent } from '../../widgets/table/table.component';
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
import { Router, ActivatedRoute } from '@angular/router';
import {BreadcrumbComponent} from "../../widgets/breadcrumb/breadcrumb.component";


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
    BreadcrumbComponent
  ],
  templateUrl: './vgk.component.html',
  styleUrl: './vgk.component.scss',
})
export class VgkComponent {

  submit(): void {
  }
  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(this.route)
    console.log(this.route.parent)
  }

  //BreadCrumb
  // route: ActivatedRoute = inject(ActivatedRoute);
  routeConfig = this.route.routeConfig?.path
  //BreadCrumb


  // Переход на страницу vgk-add
  navigateToAddNew() {
    this.router.navigate(['/vgk-add']);
  }
  // Переход на страницу vgk-add

  // скрыть и отркыть филтрацию
  isElementVisible: boolean = true;
  rotateClass: string = '';

  toggleElement() {
    this.isElementVisible = !this.isElementVisible;
    this.rotateClass = this.isElementVisible ? 'rotate-element' : '';
  }

  // скрыть и отркыть филтрацию

  // Таблица и пагинация
  service: FakeApiService = inject(FakeApiService);

  dataList!: MatTableDataSource<any>;
  searchValue: string = '';

  displayedColumns = [
    'id',
    'title',
    'price',
    'category',
    'description',
    'image',
  ];

  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  urlProduct = 'https://fakestoreapi.com/products';

  // Таблица и пагинация

  // UI-select
  selectedValue: any;
  statusOptions = [
    { value: 1, label: 'Активный' },
    { value: 2, label: 'Неактивный' },
    { value: 3, label: 'В процессе' }
  ];

  onSelectedValueChange(selectedValue: any) {
    this.selectedValue = selectedValue;
    console.log(this.selectedValue);

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


  // Фильтрация
  // filteredInput(text: string):void {
  //   if(!text) {
  //     return
  //   }else {
  //       return this.dataList.filter((data) => data?.title.toLowerCase().includes(text.toLowerCase()))
  //   }
  // }

  // Фильтрация




}
