import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  roleActive: boolean = true; //true = actor; false = director

  name: string = '';
  email: string = '';
  password: string = '';
  confirm: string = '';

  error: string = '';

  constructor (private service: AuthService) {}

  actorPill() {
    this.roleActive = true;
  }

  directorPill() {
    this.roleActive = false;
  }

  onSubmit() {
    if (this.password !== this.confirm) {
      this.error = "Passwords are not the same";
    } else {
      if (!this.name || !this.email || !this.password || !this.confirm) {
        this.error = "Please, fill all the fields";
      } else {
        this.service.onRegister(this.email, this.password, this.name, this.roleActive).subscribe(
          (response: any) => {
            if(response.status === "incorrect") {
              this.error = "This email is already registerred";
            } else {
              console.log("success");
            }
          },
          (error) => {
            console.log('ERROR: ', error);
          }
        );
      }
    }
  }

}
