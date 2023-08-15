import { environment } from './../../../environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }


  saveProfilePic(userId: any, role: string, image: any) {
    return this.http.post(environment.apiURL + '/profile-pic', { userId, role, image });
  }


}
