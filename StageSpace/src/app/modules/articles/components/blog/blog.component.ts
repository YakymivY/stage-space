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

  likeUrl: string = '../../../../../assets/png/like.png';

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
    this.articles = this.articles.filter(article => article._id != id);
    this.service.deleteArticle(id).subscribe(
      (response: any) => {
        this.router.navigate([response.redirect]);
        //this.articles = response.articles;
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }

  likePost(i: number) {
    if(this.likeUrl === '../../../../../assets/png/like.png') {
      this.likeUrl = '../../../../../assets/png/dislike.png'
      this.service.likeArticle(this.articles[i]._id).subscribe(
        (response: any) => {
          console.log(response);
        },
        error => {
          console.log("ERROR: ", error);
        }
      );
    } else {
      this.likeUrl = '../../../../../assets/png/like.png';
      this.service.dislikeArticle(this.articles[i]._id).subscribe(
        (response: any) => {
          console.log(response);
        },
        error => {
          console.log("ERROR: ", error);
        }
      );
    }
  }

  showImage(image: string) {
    this.modalImage = image;
  }
}
