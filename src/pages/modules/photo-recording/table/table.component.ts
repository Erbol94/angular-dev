import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { BubblePaginationDirective } from './bubble-pagination.directive';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  AfterViewInit,
  Component,
  Input,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgFor, NgForOf } from '@angular/common';
import { FakeApiService } from '../../vgk/vgk/fake-api.service';

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
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 0;
  @Input() showFirstLastButtons: boolean = false;
  @Input() url: string = '';
  @Input() body: any;
  @Input() vehicleNumber: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading: boolean = true;
  dataSource!: MatTableDataSource<any>;
  dataSourceLength: number;

  constructor(private service: FakeApiService) {}

  ngAfterViewInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.service.postData(this.url, this.body).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<any>(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSourceLength = res.data.length;
      this.isLoading = false;
    });
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  // Главный фильтр поиска
  criteria: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      const vehicleNumber = changes['vehicleNumber']
        ? changes['vehicleNumber'].currentValue
        : null;

      // Очищаем критерии перед добавлением новых
      this.criteria = [];

      if (vehicleNumber) {
        this.criteria.push({
          fieldName: 'vehicleNumber',
          operator: 'like',
          value: vehicleNumber,
        });
      }

      this.body.data.criteria = this.criteria;

      if (this.criteria.length > 0) {
        setTimeout(() => {
          this.fetchData();
        }, 1000);
      }
    }
  }

  // Главный фильтр поиска


}
