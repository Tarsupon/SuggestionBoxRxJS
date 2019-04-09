import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.httpClient.get<any>('https://jsonplaceholder.typicode.com/users')
  }

}
