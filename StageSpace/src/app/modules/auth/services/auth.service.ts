import { environment } from './../../../environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subject = new Subject();

  constructor(private http: HttpClient) { }

  createUser(name: string, surname: string, email: string, password: string) {
    return this.http.post(environment.nonApiURL + "/create-user", { name, surname, email, password }); //-> authorization.ts
  }

  onRegister(data: {}) {
    return this.http.post(environment.nonApiURL + '/register', { data }); //-> authorization.ts
  }

  onLogin(email: string, password: string) {
    return this.http.post(environment.nonApiURL + '/login', { email, password }); //-> authorization.ts
  }

  loadProfilePicture(): Observable<any> {
    return this.http.get(environment.apiURL + '/get-profile-picture'); //-> authorization.ts
  }

  checkEmail(email: any): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(environment.nonApiURL + '/check-email', { params }); //-> authorization.ts
  }

  sendToEmail(email: any, verification_code: number) {
    return this.http.post(environment.nonApiURL + '/send-email', { email, verification_code }); //-> authorization.ts
  }
}
