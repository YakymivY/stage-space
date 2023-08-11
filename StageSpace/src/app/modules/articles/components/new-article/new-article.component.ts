import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent {

  title: string = '';
  description: string = '';
  postImage: any = '';

  constructor(private service: ArticleService, private router: Router) {}

  async selectFile(event: any) {
    const image = event.target.files[0];
    const base64 = await convertToBase64(image);
    this.postImage = base64;
  }

  onSubmit() {
    this.service.createArticle(this.title, this.description, this.postImage).subscribe(
      (response: any) => {
        if (response.redirect) {
          this.router.navigate(['/article/' + response.redirect]);
        } else {
          //error on the server
          this.router.navigate(['/articles/new']);
          console.log('Server responded with error:', response);
        }
      }, 
      error => {
        this.router.navigate(['/articles/new']);
        console.log(error);
      }
    );
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