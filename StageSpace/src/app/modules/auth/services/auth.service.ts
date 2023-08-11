import { environment } from './../../../environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  loadStartpage() {
    return this.http.get(environment.apiURL + '/get-name');
  }

  loadUsername() {
    return this.http.get(environment.apiURL + '/get-name');
  }
}
