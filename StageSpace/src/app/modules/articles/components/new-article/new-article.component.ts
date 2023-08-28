import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  title: string = '';
  description: string = '';
  postImage: any = '';

  username: string = '';
  userId: string = '';

  constructor(private service: ArticleService, private router: Router, private utilsService: UtilsService) {}

  ngOnInit () {
    this.utilsService.loadUser().subscribe(
      (response: any) => {
        this.username = response.username;
        this.userId = response.id;
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }

  async uploadImage(event: any) {
    this.postImage = await this.utilsService.selectFile(event);
  }

  onSubmit() {
    this.service.createArticle(this.title, this.description, this.postImage, this.username, this.userId).subscribe(
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