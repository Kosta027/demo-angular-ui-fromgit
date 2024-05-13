import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getUserFormStructure(): Observable<any> {
    return this.http.get('https://springazuredemoapp.azurewebsites.net/api/user');
  }

  getCarDriverFormStructure(): Observable<any> {
    return this.http.get('https://springazuredemoapp.azurewebsites.net/api/cardriver');
  }

  postUserFormStructure(data: any) {
    return this.http.post('https://springazuredemoapp.azurewebsites.net/api/user', data);
  }

  postCarDriverFormStructure(data: any) {
    return this.http.post('https://springazuredemoapp.azurewebsites.net/api/cardriver', data);
  }
}
