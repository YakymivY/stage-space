import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartService } from '../../services/start.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

//SHARED
import { Article, User } from '../../../../shared/shared.interfaces';
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
        this.userArticles = response.articles;
        console.log(this.userArticles);
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }

  // async uploadProfilePicture (event: any) {
  //   this.profileImage = await this.service.selectFile(event);
  // }


}
