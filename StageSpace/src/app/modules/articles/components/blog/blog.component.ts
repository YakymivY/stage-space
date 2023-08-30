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
          response[i].likesCount = response[i].likedUserIds.length;
          response[i].date = convertDate(response[i].date);
        }
        console.log(response);
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
    if(this.articles[i].isLiked) {

      //decrease like count
      this.articles[i].likesCount--;

      //sending request to delete like from db
      this.service.dislikeArticle(this.articles[i]._id).subscribe(
        (response: any) => {
          console.log(response);
        },
        error => {
          console.log("ERROR: ", error);
        }
      );
    } else {

      //increase like count
      this.articles[i].likesCount++;

      //sending request to add like to db
      this.service.likeArticle(this.articles[i]._id).subscribe(
        (response: any) => {
          console.log(response);
        },
        error => {
          console.log("ERROR: ", error);
        }
      );
    }
    this.articles[i].isLiked = !this.articles[i].isLiked;
  }

  showImage(image: string) {
    this.modalImage = image;
  }
}
