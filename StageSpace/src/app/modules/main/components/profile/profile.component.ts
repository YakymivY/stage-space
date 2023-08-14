import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartService } from '../../services/start.service';

interface User {
  id: string,
  email: string,
  username: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  id: string | null = null;
  user: User | null = null;

  profileImage: any;
  

  constructor(private route: ActivatedRoute, private service: StartService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getUser(this.id).subscribe(
      (response: any) => {
        this.user = response.user;
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }

  async uploadProfilePicture (event: any) {
    this.profileImage = await this.service.selectFile(event);
  }


}
