import { AuthService } from '../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  name: string = '';

  constructor(private service: AuthService) { }

  ngOnInit() {
    this.service.loadStartpage().subscribe(
      (response: any) => {
        this.name = response;
      },
      error => {
        console.log("ERROR: ", error);
      }
    );
  }
}
