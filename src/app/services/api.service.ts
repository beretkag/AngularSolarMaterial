import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private serverUrl = 'http://localhost:3000/';

  selectAll(table: string){
    return this.http.get(this.serverUrl + table);
  }

  select(table: string, field: string, value:string, op: string){
    return this.http.get(this.serverUrl + table + '/' + field + '/' + op + '/' + value);
  }

  insert(table: string, data: any){
    return this.http.post(this.serverUrl + table, data);
  }

  update(table:string, id:string, data:any){
    return this.http.patch(this.serverUrl + table + '/' + id, data);
  }

  delete(table:string, field:string, value:string){
    return this.http.delete(this.serverUrl + table + '/' + field + '/' + value);
  }

}