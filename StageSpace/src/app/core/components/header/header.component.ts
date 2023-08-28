import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  username: any = '';
  userId: string = '';

  constructor(private utilsService: UtilsService, private router: Router) {}


  ngOnInit() {
    this.utilsService.loadUser().subscribe(
      (response: any) => {
        this.username = response.username;
        this.userId = response.id;
      }, 
      error => {
        console.log("ERROR: ", error);
      }
    );
    // this.service.subject.subscribe((value) => {
    //   this.username = value;
    // });
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }

}
