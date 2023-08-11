import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  username: string = '';

  constructor(private service: AuthService, private router: Router) {}


  ngOnInit() {
    this.service.loadUsername().subscribe(
      (response: any) => {
        this.username = response;
      },
      error => {
        console.log("ERROR: ", error)
      }
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }

}
