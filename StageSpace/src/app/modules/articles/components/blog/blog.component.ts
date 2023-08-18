import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';

//SHARED
import { Article } from '../../../../shared/shared.interfaces';
import { convertDate } from 'src/app/shared/utils';
//

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  
  follows: any[] = [];
  articles: Article[] = [];

  modalImage: string = '';

  constructor (private service: ArticleService, private router: Router) {}

  ngOnInit () {
    this.service.getAllArticles().subscribe(
      (response: any) => {
        if (response === "error") {
          alert("ERROR. Could not get articles");
          return;
        }
        for (let i = 0; i < response.length; i++) {
          response[i].date = convertDate(response[i].date);
        }
        this.articles = response;
      },
      error => {
        alert("ERROR. Could not get articles");
        console.log("ERROR: ", error);
      }
    );
  }

  deleteArticle (id: any) {
    this.service.deleteArticle(id).subscribe(
      (response: any) => {
        this.router.navigate([response.redirect]);
        this.articles = response.articles;
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }

  showImage(image: string) {
    this.modalImage = image;
  }
}
