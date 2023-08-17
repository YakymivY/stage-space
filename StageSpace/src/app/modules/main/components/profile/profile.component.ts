import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartService } from '../../services/start.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

//SHARED
import { Article, User } from '../../../../shared/shared.interfaces';
import { convertDate } from 'src/app/shared/utils';
//

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  id: string | null = null;
  user: User | null = null;

  profileImage: any;

  userArticles: Article[] = [];
  

  constructor(private route: ActivatedRoute, private service: StartService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getUser(this.id).subscribe(
      (response: any) => {
        this.user = response.user;
        this.profileImage = response.user.profilePicture;
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
    this.service.getUserArticles(this.id).subscribe(
      (response: any) => {
        for (let i = 0; i < response.articles.length; i++) {
          response.articles[i].date = convertDate(response.articles[i].date);
        }
        this.userArticles = response.articles;
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }


}
