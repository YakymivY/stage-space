import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  username: any = '';

  constructor(private service: AuthService, private router: Router) {}


  ngOnInit() {
    this.service.loadUsername();
    this.service.subject.subscribe((value) => {
      console.log(value);
      this.username = value;
    });
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }

}
