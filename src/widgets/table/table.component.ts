import {
  AfterViewInit,
  Component,
  Input,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgFor, NgForOf } from '@angular/common';
import { FakeApiService } from '../../pages/modules/vgk/vgk/fake-api.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BubblePaginationDirective } from './bubble-pagination.directive';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    NgFor,
    NgForOf,
    RouterLink,
    NgIf,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    BubblePaginationDirective,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit {

  @Input() displayedColumns: any[] = [];
  dataSource!: MatTableDataSource<any>;
  selection!: SelectionModel<any>;
  dataSourceLength!: number;

  //Принимает параметры от родителя
  @Input() statusSelect!: number | undefined;
  @Input() startDate!: any;
  @Input() endDate !: any;
  @Input() selectedOption !: any;

  @Input() pageSize: number | undefined;
  @Input() pageIndex: number | undefined;
  @Input() pageSizeOptions: number[] = [];
  @Input() showFirstLastButtons!: boolean | true;
  @Input() url!: string;
  @Input() body!: any;
  @Input() trailerNumber!: string | '';

  isLoading: boolean = false;

  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  service: FakeApiService = inject(FakeApiService);

  constructor() {
    
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.service.postData(this.url, this.body).subscribe((res: any) => {
      if(res.data){
        res.data.map((item: any) => {
          // return this.getStatusText(item.status);
          item.status = this.getStatusText(item.status);
          item.violation = this.getViolationText(item.violation)
          item.weighingType = this.getWeightType(item.weighingType)
        })
      }else {
        res.data  = []
      }

      this.dataSource = new MatTableDataSource<any>(res.data)
      this.selection = new SelectionModel<any>(true, this.dataSource.data)
      console.log(this.selection)
      this.dataSourceLength = this.dataSource.data.length
      this.dataSource.paginator = this.paginator
      this.isLoading = false
    })
  }

  getStatusText(status: string): string {
    switch (status) {
      case '1':
        return 'Оформлено';
      case '2':
        return 'Не оформлено';
      default:
        return 'Неизвестный статус';
    }
  }

  getViolationText(violation: string): string {
    switch (violation) {
      case '1':
        return 'Нет нарушений';
      case '2':
        return 'Превышение по общей массе';
      case '3':
        return 'Превышение нагрузки на ось';
      case '4':
        return 'Превышение по общей массе и нагрузке на ось';
      case '5':
        return 'Превышение по габаритам';
      case '6':
        return 'Превышение по габаритам и нагрузке на ось';
      case '7':
        return 'Превышение по габаритам и общей массе';
      case '8':
        return 'Превышение по габаритам, общей массе и нагрузке на ось';
      default:
        return '';
    }
  }

  getWeightType(type: string):string {
    switch (type) {
      case '1':
        return 'Динамическое взвешивание';
      case '2':
        return 'Взвешивание в статике';
      default:
        return '';
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes)
  //   if (changes) {
  //     // const statusSelect = changes['statusSelect'].currentValue
  //     const trailerNumber = changes['trailerNumber'].currentValue;
  //     this.body.data.criteria = trailerNumber ? [{ fieldName: "trailerNumber", operator: "like", value: trailerNumber }] : [];
  //     // this.body.data.criteria = statusSelect ? [{ fieldName: "status", operator: "like", value: statusSelect }] : [];
  //     setTimeout(()=> {
  //       this.fetchData();
  //     }, 1000)
  //   }


  // }
  
  // timeout: any; 
  criteria: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && (changes['statusSelect'] || changes['trailerNumber'])) {
      const statusSelect = changes['statusSelect'] ? changes['statusSelect'].currentValue : null;
      const trailerNumber = changes['trailerNumber'] ? changes['trailerNumber'].currentValue : null;
  
      // Очищаем критерии перед добавлением новых
      this.criteria = [];
  
      if (trailerNumber) {
        this.criteria.push({ fieldName: "transportNumber", operator: "like", value: trailerNumber });
      }

      if (statusSelect) {
        this.criteria.push({ fieldName: "status", operator: "like", value: statusSelect });
      }
  
      this.body.data.criteria = this.criteria;
  
      if (this.criteria.length > 0) {
        setTimeout(() => {
          this.fetchData();
        }, 3000);
      }
    }
  }
  

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

}
