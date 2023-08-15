import { StartService } from 'src/app/modules/main/services/start.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';

interface User {
  id: string,
  email: string,
  username: string,
  role: string, 
  profilePicture: string
}

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: User | null = null;
  profileImage: any;

  constructor(private authService: AuthService, private startService: StartService, private service: ProfileService) {}

  ngOnInit() {
    this.authService.loadUser().subscribe(
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
  }

  async uploadProfilePicture(event: any) {
    this.profileImage = await this.startService.selectFile(event);
    if (this.user) this.service.saveProfilePic(this.user.id, this.user.role, this.profileImage).subscribe(
      (response: any) => {
        console.log(response);
        //some other actions
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }

}
