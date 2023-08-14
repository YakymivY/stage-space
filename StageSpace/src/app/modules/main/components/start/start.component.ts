import { AuthService } from '../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { StartService } from '../../services/start.service';

interface Actor {
  _id: string,
  email: string, 
  username: string,
  followed: boolean
}

interface Director {
  _id: string,
  email: string, 
  username: string,
  followed: boolean
}

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
        console.log(response);
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }

  actorOnFollow (i: number) {
    this.actors[i].followed = !this.actors[i].followed;
  }

  directorOnFollow (j: number) {
    this.directors[j].followed = !this.directors[j].followed;
  }
}
