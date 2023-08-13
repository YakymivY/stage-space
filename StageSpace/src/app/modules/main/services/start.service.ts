import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/app/environment';


@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private http: HttpClient) { }


  loadUsers() {
    return this.http.get(environment.apiURL + "/get-users");
  }

}
