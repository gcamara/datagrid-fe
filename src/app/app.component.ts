import { Component } from '@angular/core';
import { GsrDatagridColumn } from 'gs-angular-controls/lib/components/gsr-data-grid/gsr-data-grid.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'datagrid-fe';

  columns: GsrDatagridColumn[] = [
    { name: 'ID', type: 'text', value: 'id' },
    { name: 'Name', type: 'text', value: 'name' },
    { name: 'Email', type: 'text', value: 'email' },
    { name: 'Phone', type: 'text', value: 'phone' },
    { name: 'Company', type: 'text', value: 'company name' },
  ];

  dataSource: any[] = [];

  constructor() {
    this.dataSource = Array.from({ length: 200 }, (_, k) => this.createNewUser(k + 1));
  }

  createNewUser(id: number): any {
    return {
      id,
      name: 'User ' + id,
      email: 'user' + id + '@gmail.com',
      phone: '0123456789',
      "company name": 'Company ' + id
    };
  }

  onAddClicked(event?: any) {}
}
