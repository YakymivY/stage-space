import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/app/environment';


@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private http: HttpClient) { }

  //IMAGES

  async selectFile(event: any) {
    const image = event.target.files[0];
    const base64 = await convertToBase64(image);
    const finalImage = base64;
    return finalImage;
  }

  //


  loadUsers() {
    return this.http.get(environment.apiURL + "/get-users");
  }

  getUser(id: any) {
    const params = new HttpParams().set('id', id);
    return this.http.get(environment.apiURL + "/get-user", { params }); //users.ts
  }

  getUserArticles(id: any) {
    const params = new HttpParams().set('id', id);
    return this.http.get(environment.apiURL + "/get-user-articles", { params }); //users.ts
  }

}


function convertToBase64(file: any) {
  return new Promise ((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}