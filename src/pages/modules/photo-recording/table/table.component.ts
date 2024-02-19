import {SelectionModel} from '@angular/cdk/collections';
import {AfterViewInit, Component, Input, OnInit, ViewChild, inject} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FakeApiService } from '../../vgk/vgk/fake-api.service';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { BubblePaginationDirective } from './bubble-pagination.directive';
import { NgFor, NgForOf, NgIf } from '@angular/common';

export interface PeriodicElement {
  createTime: string;
  createdOn: number;
  id: number;
  recordingMethod: string;
  vehicleNumber: string;
  camera: object;
}


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule , MatPaginatorModule, BubblePaginationDirective, NgIf, NgFor, NgForOf],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['select', 'createTime',  'vehicleNumber',  'snapshotTime',  'camera',  'recordingMethod',  'createdOn'];
  dataSource = new MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  service: FakeApiService = inject(FakeApiService);
  @ViewChild(MatPaginator) paginator!: MatPaginator | null;

  pageSize: number | undefined;
  pageIndex: number | undefined;
  showFirstLastButtons: false | undefined;

  dataLength!: number;
  data: any;
  isLoading: boolean = false;


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
  
  constructor(){}

  ngOnInit(): void {
    this.fetchData();
    this.pageSize = 8;
    this.pageIndex = 0;
  }

  ngAfterViewInit(): void {

  }

  fetchData(): void {
    this.isLoading = true;
    this.service.postData(this.url, this.bodyProduct).subscribe((res: any) => {

      this.dataSource = new MatTableDataSource<any>(res.data)
      this.selection = new SelectionModel<any>(true, res.data)
      this.dataLength = this.dataSource.data.length
      this.dataSource.paginator = this.paginator
      this.isLoading = false
    })
  }
 

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataLength;
    return numSelected === numRows;
  }


  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
