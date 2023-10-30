import { Component, OnInit } from '@angular/core';
import { StartService } from '../../services/start.service';
import { Router } from '@angular/router';

//SHARED
import { User } from './../../../../shared/shared.interfaces';
//

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  users: User[] = [];
  actors: User[] = [];
  directors: User[] = [];

  isFollowed: boolean = false;

  constructor(private router: Router, private service: StartService) { }

  ngOnInit() {

    this.service.loadUsers().subscribe(
      (response: any) => {
        this.users = response.users;
        this.users.forEach(user => {
          user.role === "actor" ? this.actors.push(user) : this.directors.push(user);
          //mark every user as followed/unfollowed
          if (response.myFollows.some((myFollow: { following: string }) => myFollow.following === user._id)) user.followed = true;
        });
        console.log(this.users, this.actors, this.directors);
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }

  actorOnFollow (i: number) {
    this.actors[i].followed = !this.actors[i].followed;
    if (this.actors[i].followed === true) {
      this.service.followUser(this.actors[i]._id).subscribe(
        (response: any) => {
          console.log(response);
        },
        error => {
          console.log("ERROR: ", error);
        }
      );
    } else {
      console.log("unfollow");
      this.service.unfollowUser(this.actors[i]._id).subscribe(
        (response: any) => {
          console.log(response);
        },
        error => {
          console.log("ERROR: ", error);
        }
      );
    }
  }

  directorOnFollow (j: number) {
    this.directors[j].followed = !this.directors[j].followed;
    if (this.directors[j].followed === true) {
      this.service.followUser(this.directors[j]._id).subscribe(
        (response: any) => {
          console.log(response);
        },
        error => {
          console.log("ERROR: ", error);
        }
      );
    }
  }

  onChatActor(i: number) {
    this.router.navigate(['/chatting/chat', this.actors[i]._id]);
  }

  onChatDirector(j: number) {
    this.router.navigate(['/chatting/chat', this.directors[j]._id]);
  }
}
