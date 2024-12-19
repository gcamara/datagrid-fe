import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GsrLazyLoadEvent, GsrTableLazyLoadResponse } from "gs-angular-controls";
import { first, map, Observable } from "rxjs";
import { EmployeeCardTabType } from "./employee-card/ee-card-tab/ee-card-tab.const";

const MAX_ITEMS = 500;

@Injectable({
    providedIn: 'root'
})
export class AppService {

    dataSource: any[] = [];

    constructor(private http: HttpClient) {}

    getDataSource(event?: Partial<GsrLazyLoadEvent>): Observable<GsrTableLazyLoadResponse> {
        let params = { };
        
        if (event) {
            params = {
                page: event.page || 0,
                pageSize: event.pageSize || 50,
                filters: event.filters ? { ...event.filters } : {},
                ...(event.sort && {
                    sort: { column: event.sort.column?.definition, order: event.sort.order }
                }),
                ...(event.limit && { limit: event.limit })
            }
        }

        return this.http.post<GsrTableLazyLoadResponse>('http://localhost:9000/users', params, {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json'
        });
        // if (!event) {
        //     return forkJoin([this.createFakeAsyncCall()]);
        // }

        // const { pages } = event;
        // const requests = pages.map((page: number) => this.createFakeAsyncCall(page, event.pageSize));
        // return forkJoin(requests) as any;
    }

    // createFakeAsyncCall(page?: number, pageSize?: number): Observable<GsrTableLazyLoadResponse> {
    //    return timer(1000 * Math.random() + 200).pipe(
    //     map(() => {
    //         if (this.dataSource.length + (pageSize || 50) > MAX_ITEMS) {
    //             return { data: [], page: 0, totalItems: MAX_ITEMS };
    //         }
    //         const data = Array.from({ length: pageSize || 50 }, (_, k) => this.createNewUser(k + 1 + ((page || 0) * 50)));
    //         this.dataSource.splice((page || 0) * (pageSize || 50), pageSize || 50, ...data);
    //         if (!page) {
    //             return { data, page: 0, totalItems: MAX_ITEMS };
    //         }

    //         return { data, page, totalItems: MAX_ITEMS }
    //         }
    //     ),
    //     first());
    // }

    createNewUser(id: number): any {
        return {
          id,
          name: 'User ' + id,
          email: 'user' + id + '@gmail.com',
          phone: '0123456789',
          "company name": 'Company ' + id,
          location: 'Location ' + id,
          department: 'Department ' + id,
          childs: 'Childs ' + id,
          coworkers: 'Coworkers ' + id,
          test: 'Test ' + id,
        };
    }

    getEECardData(type: EmployeeCardTabType): Observable<any[]> {
        return this.http.get(`./assets/data/${type}.json`).pipe(first(), map(data => data || [] )) as any;
    }
}