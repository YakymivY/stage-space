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

  // name: string = '';
  // surname: string = '';
  // birthdate: any;
  // email: string = '';
  // password: string = '';
  // confirm: string = '';

  // error: string = '';

  registerForm1 = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    birthdate: new FormControl('', Validators.required),
    institution: new FormControl('', Validators.required), /////////////////////
    status: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm: new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)]),
    phone: new FormControl('', Validators.required) ////////////////
  });

  registerForm2 = new FormGroup({
    proffesion: new FormControl('', Validators.required),
    works: new FormControl(''),
    noExperience: new FormControl('')
  });

  registerForm3 = new FormGroup({
    phoneCode: new FormControl('', Validators.required),
    emailCode: new FormControl('', Validators.required)
  });

  currentStep: number = 1;
  haveExperience: boolean = true;
  valuesArray: Object[] = [];


  constructor (private service: AuthService) {}


  get name () {
    return this.registerForm1.get('name');
  }
  get surname () {
    return this.registerForm1.get('surname');
  }
  get birthdate () {
    return this.registerForm1.get('birthdate');
  }
  get institution () {
    return this.registerForm1.get('institution');
  }
  get status () {
    return this.registerForm1.get('status');
  }
  get email () {
    return this.registerForm1.get('email');
  }
  get password () {
    return this.registerForm1.get('password');
  }
  get confirm () {
    return this.registerForm1.get('confirm');
  }
  get phone () {
    return this.registerForm1.get('phone');
  }
  //
  get proffesion () {
    return this.registerForm1.get('proffesion');
  }
  get works () {
    return this.registerForm1.get('works');
  }
  get no_experience () {
    return this.registerForm1.get('no-experience');
  }
  //
  get phoneCode () {
    return this.registerForm1.get('phoneCode');
  }
  get emailCode () {
    return this.registerForm1.get('emailCode');
  }
  //

  passwordMatchValidator(control: FormControl): { [key: string]: boolean } | null {
    const password = this?.registerForm1?.get('password')?.value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  // actorPill() {
  //   this.roleActive = true;
  //   this.role = "actor";
  // }

  // directorPill() {
  //   this.roleActive = false;
  //   this.role = "director";
  // }

  onSubmit() {
    if (this.registerForm3.valid) {
      console.log('we can submit form')
    }
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

  nextStep(form: FormGroup) {
    if (this.currentStep < 3) {
      if (form.valid) this.currentStep++;
    }
    console.log(form.value);
    this.valuesArray.push(form.value)
  }

  onExperience() {
    this.haveExperience = !this.haveExperience;
  }

}
