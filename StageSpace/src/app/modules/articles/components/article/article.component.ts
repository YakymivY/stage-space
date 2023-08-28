import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{

  id: string | null = '';
  username: string = '';
  userId: string = '';
  title: string = '';
  description: string = '';
  date: any;
  image: string = '';

  modalImage: string = '';
  
  constructor (private route: ActivatedRoute, private router: Router, private service: ArticleService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getArticle(this.id)?.subscribe(
      (response: any) => {
        if (response.redirect) {
          this.router.navigate([response.redirect]);
        }
        this.username = response.username;
        this.title = response.title;
        this.description = response.description;
        this.date = new Date(response.date).toLocaleDateString();
        this.image = response.image;
        this.userId = response.userId;
      },
      error => {
        console.log(error);
        this.router.navigate(['/articles']);
      }
    );
  }
}
