import { AuthService } from '../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { StartService } from '../../services/start.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  name: string = '';
  actors: any;
  directors: any;

  constructor(private authService: AuthService, private service: StartService) { }

  ngOnInit() {
    this.authService.loadStartpage().subscribe(
      (response: any) => {
        this.name = response;
      },
      error => {
        console.log("ERROR: ", error);
      }
    );


    this.service.loadUsers().subscribe(
      (response: any) => {
        this.actors = response.actors;
        this.directors = response.directors;
        console.log(response);
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }
}
