import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  //IMAGES

  async selectFile(event: any) {
    const image = event.target.files[0];
    const base64 = await convertToBase64(image);
    const finalImage = base64;
    return finalImage;
  }

  //

  loadUser(): Observable<any> {
    return this.http.get(environment.apiURL + '/get-token-user').pipe(share()); //-> authorization.ts
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