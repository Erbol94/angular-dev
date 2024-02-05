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
import { FakeApiService } from '../../vgk/fake-api.service';
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

  isLoading = false;

  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  service: FakeApiService = inject(FakeApiService);

  constructor() {
    
  }

  ngAfterViewInit() {
    this.fetchData();
    
  }

  fetchData(): void {
    // this.isLoading = true;
    this.service.postData(this.url, this.body).subscribe((res: any) => {

      this.dataSource = new MatTableDataSource<any>(res.data)
      this.dataSourceLength = this.dataSource.data.length
      this.dataSource.paginator = this.paginator
      // this.isLoading = false
    })
  }
  
  // timeout: any; 
  criteria: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes)  {
      const trailerNumber = changes['trailerNumber'] ? changes['trailerNumber'].currentValue : null;
  
      // Очищаем критерии перед добавлением новых
      this.criteria = [];
  
      if (trailerNumber) {
        this.criteria.push({ fieldName: "id", operator: "like", value: trailerNumber });
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
