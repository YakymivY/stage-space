import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  //role: string = 'actor';
  //roleActive: boolean = true; //true = actor, false = director

  name: string = '';
  surname: string = '';
  birthdate: any;
  email: string = '';
  password: string = '';
  confirm: string = '';

  error: string = '';

  registerForm1 = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    birthdate: new FormControl(''),
    institution: new FormControl(''),
    status: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm: new FormControl(''),
    phone: new FormControl('')
  });

  registerForm2 = new FormGroup({
    proffesion: new FormControl('')
  });

  registerForm3 = new FormGroup({
    works: new FormControl(''),
    noExperience: new FormControl('')
  });

  registerForm4 = new FormGroup({
    phoneCode: new FormControl(''),
    emailCode: new FormControl('')
  });

  constructor (private service: AuthService) {}

  // actorPill() {
  //   this.roleActive = true;
  //   this.role = "actor";
  // }

  // directorPill() {
  //   this.roleActive = false;
  //   this.role = "director";
  // }

  onSubmit() {
    // if (this.password !== this.confirm) {
    //   this.error = "Passwords are not the same";
    // } else {
    //   if (!this.name || !this.email || !this.password || !this.confirm) {
    //     this.error = "Please, fill all the fields";
    //   } else {
    //     this.service.onRegister(this.email, this.password, this.name).subscribe(
    //       (response: any) => {
    //         if(response.status === "incorrect") {
    //           this.error = "This email is already registerred";
    //         } else {
    //           console.log("success");
    //         }
    //       },
    //       (error) => {
    //         console.log('ERROR: ', error);
    //       }
    //     );
    //   }
    // }
  }

}
