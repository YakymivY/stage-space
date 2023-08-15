import { environment } from './../../../environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subject = new Subject();

  constructor(private http: HttpClient) { }

  onRegister(email: string, password: string, name: string, role: boolean) {
    if (role) {
      return this.http.post(environment.nonApiURL + '/register-actor', { email, password, name });
    } else {
      return this.http.post(environment.nonApiURL + '/register-director', { email, password, name });
    }
  }

  onLogin(email: string, password: string) {
    return this.http.post(environment.nonApiURL + '/login', { email, password });
  }

  loadUser(): Observable<any> {
    return this.http.get(environment.apiURL + '/get-token-user').pipe(share());
  }

  loadProfilePicture(): Observable<any> {
    return this.http.get(environment.apiURL + '/get-profile-picture');
  }
}
