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
    const base64 = await this.convertToBase64(image);
    const finalImage = base64;
    return finalImage;
  }

  convertToBase64(file: any) {
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

  //

  loadUser(): Observable<any> {
    return this.http.get(environment.apiURL + '/get-token-user').pipe(share()); //-> authorization.ts
  }

  convertDate(defaultDate: string): string {
    const newDate = new Date(defaultDate);

    const yyyy = newDate.getFullYear();
    let mm = newDate.getMonth() + 1;
    let dd = newDate.getDate();
    let hh = newDate.getHours();
    let min = newDate.getMinutes();
    let ddString, mmString;

    if (dd < 10) {
    ddString = '0' + dd;
    } else {
    ddString = dd;
    }
    if (mm < 10) {
    mmString = '0' + mm;
    } else {
    mmString = mm;
    }

    const formatted = hh + ':' + min + ' ' + ddString + '.' + mmString + '.' + yyyy;

    return formatted;
  }

}