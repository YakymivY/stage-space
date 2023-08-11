import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})

export class EnterComponent {

  username: string = "";
  room: string = "";

  constructor (private router: Router) {}

  onSubmit() {
    localStorage.setItem("username", this.username);
    localStorage.setItem("room", this.room);
    this.router.navigate(['chat']);
  }

}
