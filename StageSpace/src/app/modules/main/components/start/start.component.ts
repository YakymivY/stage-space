import { AuthService } from '../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { StartService } from '../../services/start.service';

//SHARED
import { Actor, Director } from './../../../../shared/shared.interfaces';
//

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  actors: Actor[] = [];
  directors: Director[] = [];

  isFollowed: boolean = false;

  constructor(private authService: AuthService, private service: StartService) { }

  ngOnInit() {

    this.service.loadUsers().subscribe(
      (response: any) => {
        this.actors = response.actors;
        this.directors = response.directors;
        //temporary set users as unfollowing
        for (let i = 0; i < this.actors.length; i++) this.actors[i].followed = false;
        for (let j = 0; j < this.directors.length; j++) this.directors[j].followed = false;
        //
        this.actors.forEach(user => {
          if (response.myFollows.some((myFollow: { following: string }) => myFollow.following === user._id)) user.followed = true;
        });
        this.directors.forEach(user => {
          if (response.myFollows.some((myFollow: { following: string }) => myFollow.following === user._id)) user.followed = true;
        });
        console.log(response);
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
}
