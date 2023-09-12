import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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
  registrationData = {};

  allInstitutions: string[] = ["Kyiv Polytechnical University", "Lviv Polytechnical University", "Shevchenka", "Franka", "Nafta"];
  institutionsToOutput: string[] = [];
  institutionValue: string = '';
  haveEducation: boolean = true;
  
  allPhoneCodes: string[] = ["+380", "+1", "+654"];
  phoneCodesToOutput: string[] = [];
  phoneCodeValue: string = '+380';


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
  get email (){
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

  onSubmit() {
    if (this.registerForm3.valid) {
      console.log('we can submit form');
      this.service.onRegister(this.registrationData).subscribe(
        (response: any) => {
          if(response.status === "incorrect") {
            console.log(response);
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

  nextStep(form: FormGroup) {
    if (this.currentStep < 3) {
      if (form.valid) {
        if(this.currentStep === 1) {
          this.service.checkEmail(this.email?.value).subscribe(
            (response: any) => {
              if (response.exist) {
                alert('This email is already registered');
              } else {
                this.currentStep++;
              }
            },
            error => {
              console.log('ERROR: ', error);
            }
          );
        } else {
          this.currentStep++;
        }
      }
    }
    this.registrationData = Object.assign({}, this.registrationData, form.value);
  }

  onExperience() {
    this.haveExperience = !this.haveExperience;
    this.registerForm2.get('works')?.setValue(''); //clearing works field
  }

  onEducation() {
    this.haveEducation = !this.haveEducation;
    this.registerForm1.get('institution')?.setValue(''); //clearing institution field
  }

  showInstitutions(event: any) {
    const value = event.target.value; //input data
    let result = [];
    
    if (value.length) { //checking whether field is empty
      result = this.allInstitutions.filter((keyword) => {
        return keyword.toLowerCase().includes(value.toLowerCase()); //finding corresponding words in an array
      });
      this.institutionsToOutput = result;
    } else {
      this.institutionsToOutput = this.allInstitutions;
    }
  }

  hideInstitutions() {
    this.institutionsToOutput = [];
  }

  displayInstitutionValue(institute: string) {
    this.institutionValue = institute;
    this.institutionsToOutput = [];
  }

  showPhoneCodes(event: any) {
    let value = '';
    if (event) value = event.target.value; //input data
    let result = [];
    
    if (value.length) { //checking whether field is empty
      result = this.allPhoneCodes.filter((keyword) => {
        return keyword.toLowerCase().includes(value.toLowerCase()); //finding corresponding words in an array
      });
      this.phoneCodesToOutput = result;
    } else {
      this.phoneCodesToOutput = this.allPhoneCodes;
    }
  }

  clearPhoneCodes() {
    this.phoneCodeValue = ''; //clearing entered value
    this.showPhoneCodes(null);
  }

  displayPhoneCodeValue(phoneCode: string) {
    this.phoneCodeValue = phoneCode;
    this.phoneCodesToOutput = [];
  }

  formattedInputValue(value: string) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 2) return `(${phoneNumber}`;
    if (phoneNumberLength < 3) return `(${phoneNumber})`;
    if (phoneNumberLength < 6) {
      return `(${phoneNumber.slice(0,2)}) ${phoneNumber.slice(2)}`;
    }
    return `(${phoneNumber.slice(0,2)}) ${phoneNumber.slice(2,5)} ${phoneNumber.slice(5,7)} ${phoneNumber.slice(7,9)}`;
  }
  
  formatPhone(event: any) {
    const value = event.target.value;
    event.target.value = this.formattedInputValue(value);
  }

}
