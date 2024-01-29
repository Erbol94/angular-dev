import {
  AfterViewInit,
  ChangeDetectorRef,
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
import { FakeApiService } from '../../pages/vgk/fake-api.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    MatCheckboxModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit {
  @Input() displayedColumns: any[] = [];
  @Input() dataSource!: MatTableDataSource<any>;

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
  displayedColumnsNew: any[] = [];

  isLoading = false;

  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  service: FakeApiService = inject(FakeApiService);

  constructor() {}

  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData(): void {
    // this.isLoading = true;
    this.service.postData(this.url, this.body).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.data)
      this.dataSource.paginator = this.paginator
      // this.isLoading = false
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      const newValue = changes['trailerNumber'].currentValue;
      this.body.data.criteria = newValue ? [{ fieldName: "trailerNumber", operator: "like", value: newValue }] : [];
      setTimeout(()=> {
        this.fetchData();
      }, 1000)
    }
  }


  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

}
