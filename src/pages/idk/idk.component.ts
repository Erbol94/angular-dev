import { Component, ViewChild, inject } from '@angular/core';
import { FakeApiService } from '../vgk/fake-api.service';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { NgFor, NgForOf } from '@angular/common';
import { TableComponent } from '../../widgets/table/table.component';

@Component({
  selector: 'app-idk',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, NgFor, NgForOf, TableComponent],
  templateUrl: './idk.component.html',
  styleUrl: './idk.component.scss'
})
export class IdkComponent {

  service: FakeApiService = inject(FakeApiService);

  dataList!: MatTableDataSource<Location>;
  displayedColumns = ['id', 'name','username', 'email' ];

  length = 20;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  urlUsers = 'https://jsonplaceholder.typicode.com/users';

  constructor() {}

}
