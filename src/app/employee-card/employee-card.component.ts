import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent {

  checkDatesForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
  });

  loadingCards = false;

  loading = false; 

  cards: any[] = [
    { name: 'Net pay', value: 0 },
    { name: 'Gross pay', value: 0 },
    { name: 'Benefits', value: 0 },
    { name: 'Deductions', value: 0 },
    { name: 'Employee taxes', value: 0 },
    { name: 'Employer taxes', value: 0 },
  ];

  tabs: any[] = [
    { 
      name: 'Overview', 
      active: true,
      columns: [
        { name: 'Check date', value: 'checkDate', },
        { name: 'Type', value: 'type' },
        { name: 'Net pay', value: 'netPay', footer: this.toCurrency },
        { name: 'Gross pay', value: 'grossPay', footer: this.toCurrency },
        { name: 'Deduction total', value: 'deductionTotal', footer: this.toCurrency },
        { name: 'EE taxes', value: 'eeTaxes', footer: this.toCurrency },
        { name: 'Benefits total', value: 'benefitsTotal', footer: this.toCurrency },
        { name: 'Actions', value: 'actions', footer: () => '' }
      ]
     },
    { 
      name: 'Earnings', 
      active: false,
      columns: [
        { name: 'Type', value: 'type' },
        { name: 'Earning code', value: 'earningCode' },
        { name: 'Check date', value: 'checkDate' },
        { name: 'Location code', value: 'locationCode' },
        { name: 'Hours', value: 'hours', footer: (total: number) => total },
        { name: 'Minutes', value: 'minutes', footer: (total: number) => total },
        { name: 'Units', value: 'units', footer: (total: number) => total },
        { name: 'Pay rate', value: 'payRate', footer: () => '' },
        { name: 'Gross pay', value: 'grossPay', footer: this.toCurrency },
      ]
    },
    { 
      name: 'Deductions',
      active: false,
      columns: [
        { name: 'Deduction code', value: 'deductionCode' },
        { name: 'Deduction type?', value: 'type' },
        { name: 'Check date', value: 'checkDate' },
        { name: 'Amount', value: 'amount', footer: this.toCurrency },
      ]
    },
    { 
      name: 'Benefits', 
      active: false,
      columns: [
        { name: 'Benefit code', value: 'benefitCode'},
        { name: 'Benefit type?', value: 'type' },
        { name: 'Check date', value: 'checkDate' },
        { name: 'Amount', value: 'amount', footer: this.toCurrency  },
      ]
    },
    { 
      name: 'Taxes', 
      active: false,
      columns: [
        { name: 'Tax name', value: 'taxName' },
        { name: 'Code', value: 'code' },
        { name: 'Check date', value: 'checkDate' },
        { name: 'Gross wages', value: 'grossWages', footer: this.toCurrency },
        { name: 'Taxable wages', value: 'taxableWages', footer: this.toCurrency },
        { name: 'Amount', value: 'amount', footer: this.toCurrency  },
      ]
    },
  ];

  dataSource = [];

  totalValues = new Map<string, any>();

  activeTab: any;

  constructor(private appService: AppService) {}

  toCurrency(value: number): string | null {
    return new CurrencyPipe('en-US').transform(value, 'USD', 'symbol', '1.2-2');
  }

  ngOnInit(): void {
    this.loadCards();
    this.getData(this.tabs[0]);
  }

  loadCards(): void {
    this.loadingCards = true;
    setTimeout(() => {
      this.loadingCards = false;
      this.cards = this.cards.map(card => ({ ...card, value: (Math.random() * 1000) }));
    }, 1500);
  }

  getData(tab: any) {
    this.loading = true;
    this.activeTab = tab;
    this.appService.getEECardData(tab.name).subscribe((data: any) => {
      setTimeout(() => {
        this.loading = false;
      })
      console.log('data is', data, this.loading);
      this.dataSource = data;

      this.calculateTotalValues();
    });
  }

  calculateTotalValues(): void {
    this.totalValues.clear();
    this.dataSource.forEach((row: any) => {
      this.activeTab.columns.forEach((column: any) => {
        if (column.value === 'actions') {
          return;
        }

        if (column.footer) {
          const detailsMapped = row.details.reduce((acc: any, curr: any) => {
            return acc + curr[column.value];
          }, 0);
          this.totalValues.set(column.value, (this.totalValues.get(column.value) || 0) + detailsMapped);
        } 
      });
    });

    this.activeTab.columns.forEach((column: any) => {
      if (column.footer) {
        this.totalValues.set(column.value, column.footer(this.totalValues.get(column.value)));
      }
    });
  }


  run(): void {
    console.log('run');
  }
}
