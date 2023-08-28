import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/app/environment';


@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private http: HttpClient) { }

  loadUsers() {
    return this.http.get(environment.apiURL + "/get-users"); //-> users.ts
  }

  getUser(id: any) {
    const params = new HttpParams().set('id', id);
    return this.http.get(environment.apiURL + "/get-user", { params }); // -> users.ts
  }

  getUserArticles(id: any) {
    const passId = id || 'no id';
    const params = new HttpParams().set('id', passId);
    return this.http.get(environment.apiURL + "/get-user-articles", { params }); // -> users.ts
  }

  followUser(followingId: any) {
    return this.http.post(environment.apiURL + "/follow-user", { followingId }); // -> users.ts
  }

  unfollowUser(followingId: any) {
    const params = new HttpParams().set('id', followingId);
    return this.http.delete(environment.apiURL + "/unfollow-user", { params }); // -> users.ts
  }

}