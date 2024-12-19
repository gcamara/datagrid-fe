// import { Component, ViewChild } from '@angular/core';
// import {
//   GsrDatagridColumn,
//   GsrLazyLoadEvent,
//   GsrTableComponent,
//   GsrTableDataSource
// } from 'gs-angular-controls';

// import { DropdownOption } from 'gs-angular-controls/lib/components/gsr-dropdown/gsr-dropdown.model';
// import { AppService } from './app.service';

// interface CustomDataGridColumn extends GsrDatagridColumn {
//   [key: string]: any;
// }

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   // changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class AppComponent {
//   title = 'datagrid-fe';


//   dropdownColumns: CustomDataGridColumn[] = [
//     { name: 'Location', type: 'text', value: 'location' },
//     { name: 'Department', type: 'text', value: 'department' },
//     { name: 'Childs', type: 'text', value: 'childs' },
//   ];

//   columns: CustomDataGridColumn[] = [
//     { name: 'ID', type: 'number', value: 'id', sorteable: true },
//     { name: 'Name', type: 'text', value: 'name', sorteable: true },
//     { name: 'Email', type: 'text', value: 'email', sorteable: true },
//     { name: 'Phone', type: 'number', value: 'phone' },
//     { name: 'Company', type: 'text', value: 'company name' },
//     { name: 'Coworkers', type: 'text', value: 'coworkers' },
//     { name: 'Test', type: 'text', value: 'test' },
//   ];

//   allColumns: CustomDataGridColumn[] = [
//     ...this.columns,
//     ...this.dropdownColumns,
//   ];

//   staticHeader = true;

//   // useVirtualScroll = true;

//   dataSource: GsrTableDataSource | any[] = Array.from({ length: 150 }, (_, k) => this.service.createNewUser(k + 1));;

//   totalRecords: number = 0;

//   // pageSize = this.useVirtualScroll ? 50 : 150;

//   loading!: boolean;

//   @ViewChild(GsrTableComponent)
//   table!: GsrTableComponent;

//   locations: DropdownOption[] = Array.from({ length: 10 }, (_, k) => ({ value: `Location ${k + 1}` }));
  
//   departments: DropdownOption[] = Array.from({ length: 10 }, (_, k) => ({ value: `Department ${k + 1}` }));

//   childs: DropdownOption[] = Array.from({ length: 10 }, (_, k) => ({ value: `Childs ${k + 1}` }));

//   constructor(private service: AppService) { 
//   }

//   ngOnInit(): void {
//     // this.loading = false;
//     // if (this.useVirtualScroll) {
//     //   this.dataSource = new GsrTableDataSource({ dataSource: [], pageSize: this.pageSize, totalRecords: 0 });
//     // } else {
//       // this.dataSource = Array.from({ length: 150 }, (_, k) => this.service.createNewUser(k + 1));
//     // }

//     // this.service.getDataSource({ pageSize: 200, })
//     //   .pipe(delay(500))
//     //   .subscribe(results => { 
//     //     this.dataSource = results.data;
//     //     // console.log('response was', results);
//     //     // this.totalRecords = results.totalRecords;
//     //     this.loading = false;
//     //   });
//   }

//   getOptions(col: string): DropdownOption[] {
//     switch (col) {
//       case 'Location':
//         return this.locations;
//       case 'Department':
//         return this.departments;
//       case 'Childs':
//         return this.childs;
//       default:
//         return [];
//     }
//   }

//   onAddClicked(event?: any) {}

//   onPageRequest(event: GsrLazyLoadEvent) {
//     // this.loading = true;
//     console.log('page request with', event);

//     // this.service.getDataSource(event)
//     //   .pipe(delay(500))
//     //   .subscribe((data: GsrTableLazyLoadResponse) => {
//     //     console.log('response was', data);
//     //     this.totalRecords = data.totalRecords;
        
//     //     if (this.dataSource instanceof GsrTableDataSource) {
//     //       this.dataSource.updateDataSource(data);
//     //     } 
//     //     else {
//     //       this.dataSource = data.data;
//     //     }

//     //     this.loading = false;
//     //   });
//   }
// }
