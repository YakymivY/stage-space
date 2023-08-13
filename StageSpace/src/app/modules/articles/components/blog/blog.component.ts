import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';

interface Article {
  _id: any,
  title: string,
  date: string,
  description: string,
  image: string
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  
  articles: Article[] = [];

  constructor (private service: ArticleService, private router: Router) {}

  ngOnInit () {
    this.service.getAllArticles().subscribe(
      (response: any) => {
        if (response === "error") {
          alert("ERROR. Could not get articles");
          return;
        }
        for (let i = 0; i < response.length; i++) {
          const newDate = new Date(response[i].date);

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

          response[i].date = formatted;
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
}
