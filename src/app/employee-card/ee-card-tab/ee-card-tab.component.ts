import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DgTableFooterComponent, GsrTableDirective } from 'gs-angular-controls';
import { PredictiveSearchOptions } from 'gs-angular-controls/lib/components/gsr-data-grid/components/dg-top-bar/dg-top-bar.component';
import { DropdownButtonOption } from 'gs-angular-controls/lib/components/gsr-dropdown-button/gsr-dropdown-button.model';
import * as XLSX from 'xlsx-js-style';
import { EmployeeCardTab } from './ee-card-tab.const';

@Component({
  selector: 'app-ee-card-tab',
  templateUrl: './ee-card-tab.component.html',
  styleUrls: ['./ee-card-tab.component.scss']
})
export class EeCardTabComponent {

  @Input()
  active: boolean = false;

  @Input()
  dataSource: any[] = [];

  @Input()
  columns: any[] = [];

  @Input()
  type?: EmployeeCardTab;

  @Input()
  loading!: boolean;

  @Input()
  activeTab!: EmployeeCardTab;

  searchOptions: PredictiveSearchOptions = {
    searchInProperties: [{ 
      key: 'payrunName',
      path: 'payrunName',
    },
    {
      key: 'checkDate',
      path: 'details.checkDate',
      // formatRef: (value: any) => `${value.name} ${value.surname}`
    },
    {
      key: 'type',
      path: 'details.type'
    }
  ]
  };

  @Input()
  totalValues = new Map<string, any>();

  @ViewChild(GsrTableDirective, { static: true })
  table!: GsrTableDirective;

  @ViewChild(DgTableFooterComponent, { read: ElementRef })
  footer!: ElementRef<HTMLElement>;

  exportOptions: DropdownButtonOption[] = [
    { label: 'Export', value: 'pdf', onClick: (data: any) => this.exportFn('xlsx', data) },
  ]

  ngAfterViewInit(): void {
    const actionColumn: any = this.table.topBar.columnOptions.find(option => option.label === 'Actions');
    if (actionColumn) {
      actionColumn['locked'] = true;
    }
  }

  exportFn(type: string, data: any): void {
    const footer = this.footer.nativeElement.querySelector('tfoot');
    const table_elt = this.table.tableBuilder.tableElement.cloneNode(true) as HTMLTableElement;
    table_elt.tBodies[0].firstChild?.remove(); // this is the virtual scroll row that calculates the height. We don't need it.
    table_elt.querySelectorAll('tr:has(.test)').forEach(tr => {
      Array.from(tr.children).forEach(trChild => tr.parentElement?.insertBefore(trChild, tr));
      tr.remove();
    });

    const newFooter = table_elt.createTFoot();
    const footerRow = document.createElement('tr');
    newFooter.appendChild(footerRow);
    Array.from(footer!.children).forEach(node => footerRow.appendChild(node.cloneNode(true)));

    
    // Extract Data (create a workbook object from the table)
    const workbook = XLSX.utils.table_to_book(table_elt);

    // this.applyStyles(workbook, table_elt);

    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    XLSX.writeFile(workbook, "Report.xlsx", { bookType: 'xlsx' });
  }

  searchFn(col: string): (row: any, search: string) => boolean {
    return (row: any, search: string) => row[col]?.toLowerCase().includes(search.toLowerCase()) || row.details?.some((child: any) => child[col]?.toLowerCase().includes(search.toLowerCase()));
  }

  applyStyles(workbook: XLSX.WorkBook, table: HTMLTableElement): void {
    // Apply custom styles to rows with the `.test` class
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const tableHeaderRow = table.tHead!.firstChild! as HTMLTableRowElement;
    for (let i = 0; i < tableHeaderRow.children.length; i++) {
      const cellAddress = `${String.fromCharCode(65 + i)}1`;
      sheet[cellAddress].s = {
        fill: {
          patternType: "solid",
          fgColor: { rgb: "3a0ca3" },
          font: {
            color: { rgb: "FFFFFF" }
          }
        }
      };
    }

    const { children } = table.tBodies[0];

    for (let R = 0; R < children.length; R++) {
      if (children[R].classList?.contains('test')) {
        const cellAddress = `A${R+2}`;
        if (sheet[cellAddress]) {
          sheet[cellAddress].s = {
            fill: {
              patternType: "solid",
              fgColor: { rgb: "f9f9f9" }
            }
          };
        }
      }
    }

    sheet['!rows'] = [
      { hpx: 30 }
    ];
    sheet['!cols'] = [
      { wpx: 700 }
    ];
  }

  onDisplayedColumnsChange(columns: any[]): void {
    console.log('columns', columns);
  }

  onPredictiveSearch(search: any): void {
    console.log(search);
  }

}
