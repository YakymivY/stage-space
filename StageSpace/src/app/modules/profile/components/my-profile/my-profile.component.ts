import { StartService } from 'src/app/modules/main/services/start.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

//SHARED
import { User, Article } from '../../../../shared/shared.interfaces';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ArticleService } from 'src/app/modules/articles/services/article.service';
//

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: User | null = null;
  articles: Article[] = [];
  profileImage: any;

  modalImage: string = '';

  constructor(private authService: AuthService, private startService: StartService, private utilsService: UtilsService, private service: ProfileService, private articleService: ArticleService,
    private router: Router) {}

  ngOnInit() {
    this.utilsService.loadUser().subscribe(
      (response: any) => {
        this.user = response;
      }, 
      error => {
        console.log("ERROR: ", error);
      }
    );
    this.authService.loadProfilePicture().subscribe(
      (response: any) => {
        this.profileImage = response.image.profilePicture;
      }, 
      error => {
        console.log("ERROR: ", error);
      }
    );
    this.startService.getUserArticles(this.user?._id).subscribe(
      (response: any) => {
        for (let i = 0; i < response.articles.length; i++) {
          response.articles[i].date = this.utilsService.convertDate(response.articles[i].date);
        }
        this.articles = response.articles;
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }

  async uploadProfilePicture(event: any) {
    this.profileImage = await this.utilsService.selectFile(event);
    if (this.user) this.service.saveProfilePic(this.profileImage).subscribe(
      (response: any) => {
        console.log(response);
        //some other actions
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }

  deleteArticle (id: any) {
    this.articles = this.articles.filter(article => article._id != id);
    this.articleService.deleteArticle(id).subscribe(
      (response: any) => {
        this.router.navigate([response.redirect]);
        //this.articles = response.articles;
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }

  showModalImage(image: string) {
    this.modalImage = image;
  }

}
