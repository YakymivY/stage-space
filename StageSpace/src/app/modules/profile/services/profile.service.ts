import { environment } from './../../../environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }


  saveProfilePic(image: string) {
    return this.http.post(environment.apiURL + '/profile-pic', { image }); // -> profile.ts
  }


}
