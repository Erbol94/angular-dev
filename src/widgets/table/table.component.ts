import {AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { NgFor, NgForOf } from '@angular/common';
import { FakeApiService } from '../../pages/vgk/fake-api.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, NgFor, NgForOf, RouterLink, NgIf],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {
  @Input() displayedColumns: any[] = [];
  @Input() dataSource!: MatTableDataSource<any>;

  //Принимает параметры от родителя
  filteredSource: MatTableDataSource<any>;
  @Input() filterValue: string = '' ;
  @Input() statusSelect!: number | undefined;

  @Input() length: number | undefined;
  @Input() pageSize: number | undefined;
  @Input() pageIndex: number | undefined;
  @Input() pageSizeOptions: number[] = [];
  @Input() showFirstLastButtons!: boolean | true;
  @Input() url!: string;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  service: FakeApiService = inject(FakeApiService);

  filterParams = {
    category: this.filterValue,
    title: '',
    id: '',
    price: null
  };

  constructor(private changeDetectorRef: ChangeDetectorRef){
    this.filteredSource = this.dataSource
  }

  ngAfterViewInit() {
    this.service.getData(this.url).subscribe((response) => {
      this.dataSource = new MatTableDataSource(response)
      console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data, filter: string) => {
        // const filterObject = JSON.parse(filter);

        // let match = true
        // if (filterObject.category && !data.category.toLowerCase().includes(filterObject.category)) {
        //   match = false;
        // }
        // if (filterObject.title && !data.title.toLowerCase().includes(filterObject.title)) {
        //   match = false;
        // }
        // if (filterObject.id !== null && data.id !== filterObject.id) {
        //   match = false;
        // }
        // if (filterObject.price !== null && data.price !== filterObject.price) {
        //   match = false;
        // }
        // return match;

        return data.title.trim().toLowerCase().includes(filter);
      };
    })
    
  }

  

  ngDoCheck(){
    const filterObject = {
      category: this.filterParams.category.trim().toLowerCase(),
      title: this.filterParams.title.trim().toLowerCase(),
      id: this.filterParams.id,
      price: this.filterParams.price
    };

    if(filterObject){
      setTimeout(()=> {
        this.dataSource.filter = this.filterValue.trim().toLowerCase();
        // this.dataSource.filter = JSON.stringify(filterObject);
        
      }, 1000)
    }
  }

  // applyFiter(): void {
  //   const filterObject = {};

  //   // Добавляем фильтры только для не пустых значений
  //   if (this.filterValue.trim() !== '') {
  //     filterObject['title'] = this.filterValue.trim().toLowerCase();
  //   }
  //   if (this.statusSelect !== undefined) {
  //     filterObject['id'] = this.statusSelect;
  //   }

  //   // Применяем фильтр к dataSource
  //   this.dataSource.filter = JSON.stringify(filterObject);
  // }
 

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];