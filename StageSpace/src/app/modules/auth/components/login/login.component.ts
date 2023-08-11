import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  error: string = '';

  constructor(private service: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = "Please, fill all the fields";
    } else {
      this.service.onLogin(this.email, this.password).subscribe(
        (response: any) => {
          if (response.status === "incorrect") {
            this.error = "Incorrect email or password";
          } else if (response.status === "success") {
            sessionStorage.setItem("token", response.token);
            this.router.navigate(['start']);
          }
        },
        error => {
          console.log("ERROR: ", error);
        }
      );
    }
  }

}
