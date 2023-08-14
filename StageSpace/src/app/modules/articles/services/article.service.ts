import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  createArticle(title: string, description: string, image: string, username: string, id: string) {
    return this.http.post(environment.apiURL + '/post-article', { title, description, image, username, id });
  }

  getArticle(id: any) {
    const params = new HttpParams().set('id', id);
    return this.http.get(environment.apiURL + '/get-article', { params });
  }

  getAllArticles() {
    return this.http.get(environment.apiURL + '/articles');
  }

  deleteArticle(id: any) {
    const params = new HttpParams().set('id', id);
    return this.http.delete(environment.apiURL + '/delete-article', { params });
  }

}
