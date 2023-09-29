import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//SHARED
import { institutions, phoneCodes } from 'src/app/shared/shared.constants';
//

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currentStep: number = 3;
  haveExperience: boolean = true;
  registrationData = {};

  allInstitutions: string[] = institutions;
  institutionsToOutput: string[] = [];
  haveEducation: boolean = true;
  tosShowInstitutions: boolean = false;
  
  allPhoneCodes: string[] = phoneCodes;
  phoneCodesToOutput: string[] = [];
  toShowCountryCodes: boolean = false;

  verification_code: number = NaN;
  userId: string = '';
  sendCodeDisabled: boolean = false;
  timerSeconds: number = 30;
  intervalId: any;

  unsavedChanges: boolean = true;
  thirdFormError: string = '';
  invalidCodeCounter: number = 0;

  statusArray: string[] = ["Currently studying", "Finished studying"];
  proffesionArray: string[] = ["Actor", "Director", "Sound", "Cameraman"];

  registerForm1 = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    birthdate: new FormControl('', Validators.required),
    institution: new FormControl({ value: '', disabled: false }, [Validators.required, this.institutionExistsValidator.bind(this)]),
    onEducation: new FormControl(false),
    status: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm: new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)]),
    countryCode: new FormControl('+380', [Validators.required, this.phoneExistsValidator.bind(this)]),
    phone: new FormControl('', Validators.required)
  });

  registerForm2 = new FormGroup({
    proffesion: new FormControl('', Validators.required),
    works: new FormControl({ value: '', disabled: false }, [Validators.required]),
    onExperience: new FormControl(false)
  });

  registerForm3 = new FormGroup({
    phoneCode: new FormControl('', Validators.required),
    emailCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
  });


  constructor (private service: AuthService) {}

  ngOnInit(): void {
    //disable/enable institution input on checkbox
    this.onEducation?.valueChanges.subscribe(
      (value) => {
        if (value) {
          this.institution?.disable();
          this.institution?.removeValidators(Validators.required);
          //this.institution?.updateValueAndValidity();
        } else {
          this.institution?.enable();
          this.institution?.addValidators(Validators.required);
          //this.institution?.updateValueAndValidity();
        }
      }
    );

    //disable/enable works input on checkbox
    this.onExperience?.valueChanges.subscribe(
      (value) => {
        if (value) {
          this.works?.disable();
          this.works?.removeValidators(Validators.required);
          //this.works?.updateValueAndValidity();
        } else {
          this.works?.enable();
          this.works?.addValidators(Validators.required);
          //this.works?.updateValueAndValidity();
        }
      }
    );

    //value input in the institution searchbox
    this.institution?.valueChanges.subscribe(
      (value: any) => {
        this.showInstitutions(value);
      }
    );

    //value input in the phoneCode searchbox
    this.countryCode?.valueChanges.subscribe(
      (value: any) => {
        this.showPhoneCodes(value);
      }
    );

    //phone value validator
    this.phone?.valueChanges.subscribe(
      (value: any) => {
        if (this.countryCode?.value == "+380") {
          //format the value
          const formattedValue = this.formattedInputValue(value);
          //prevent infinite loop
          if (this.phone?.value !== formattedValue) {
            this.phone?.setValue(formattedValue); // Update the value
          }
        } else {
          //format the value
          const formattedValue = this.formatNumeric(value, 13);
          //prevent infinite loop
          if (this.phone?.value !== formattedValue) {
            this.phone?.setValue(formattedValue); // Update the value
          }
        }
      }
    );

    //email code value validator
    this.emailCode?.valueChanges.subscribe(
      (value: any) => {
        //format the value
        const formattedValue = this.formatNumeric(value, 6);
        //prevent infinite loop
        if (this.emailCode?.value !== formattedValue) {
          this.emailCode?.setValue(formattedValue); // Update the value
        }
      }
    );

    
  }

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
  get onEducation () {
    return this.registerForm1.get('onEducation');
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
  get countryCode () {
    return this.registerForm1.get('countryCode');
  }
  get phone () {
    return this.registerForm1.get('phone');
  }
  //
  get proffesion () {
    return this.registerForm2.get('proffesion');
  }
  get works () {
    return this.registerForm2.get('works');
  }
  get onExperience () {
    return this.registerForm2.get('onExperience');
  }
  //
  get phoneCode () {
    return this.registerForm3.get('phoneCode');
  }
  get emailCode () {
    return this.registerForm3.get('emailCode');
  }
  //


  //CUSTOM VALIDATORS
  passwordMatchValidator(control: FormControl): { [key: string]: boolean } | null {
    const password = this.registerForm1?.get('password')?.value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  institutionExistsValidator(control: FormControl): { [key: string]: boolean } | null {
    const institution = control.value;
    if (institution) {
      return this.allInstitutions.includes(institution as string) ? null : { 'incorrectInstitution': true };
    } else {
      return { 'incorrectInstitution': true };
    }
  }

  phoneExistsValidator(control: FormControl): { [key: string]: boolean } | null {
    const phoneCode = control.value;
    if (phoneCode) {
      return this.allPhoneCodes.includes(phoneCode as string) ? null : { 'incorrectPhoneCode': true };
    } else {
      return { 'incorrectPhoneCode': true };
    }
  }

  // emailCodeValidator(control: FormControl): { [key: string]: boolean } | null {
  //   const emailCode = control.value;
  //   if (emailCode) {
  //     return emailCode == this.verification_code.toString() ? null : { 'incorrectEmailCode': true };
  //   } else {
  //     return { 'incorrectEmailCode': true }
  //   }
  // }

  //


  //FORM SUBMISSION
  onSubmit() {
    const correctEmailCode = this.registerForm3.get('emailCode')?.value == this.verification_code.toString();
    if (this.registerForm3.valid && correctEmailCode) {
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
    } else {
      if (this.invalidCodeCounter <= 5) {
        this.thirdFormError = "Incorrect code, try again";
        this.emailCode?.setValue('');
        this.invalidCodeCounter++;
      } else {
        this.verification_code = 0; ///////////////////////
      }
    }
    return false;
  }

  // createUser(form: FormGroup) {
  //   if(form.valid) {
  //     this.service.createUser(form.value.name, form.value.surname, form.value.email, form.value.password).subscribe(
  //       (response: any) => {
  //         if(response.status === 'success') this.registrationData = Object.assign({}, this.registrationData, { userId: this.userId });
  //         console.log(response);
  //       }, 
  //       error => {
  //         console.log("ERROR: ", error);
  //       }
  //     );
  //   }
  // }

  nextStep(form: FormGroup) {
    if (this.currentStep < 3) {
      if (form.valid) {
        this.currentStep++;
        this.registrationData = Object.assign({}, this.registrationData, form.value);
        console.log(form.value);
      }
    }
  }

  //tracking mouse click target to close result-box
  @HostListener('window:click', ['$event'])
  onWindowClick(event: MouseEvent) {
    // Handle the click event on the whole window
    const elemId = (event.target as HTMLElement).id;
    if (elemId !== "institution" && elemId !== "result-box") {
      this.tosShowInstitutions = false;
    }
    if (elemId !== "phoneCode" && elemId !== "result-box2") {
      this.toShowCountryCodes = false;
    }
  }
  
  showInstitutions(value: any) {
    //const value = event.target.value; //input data
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

  displayInstitutionValue(event: any, institute: string) {
    this.institution?.setValue(institute);
    this.institution?.updateValueAndValidity();
    this.institutionsToOutput = [];
  }

  //PHONE CODES

  showPhoneCodes(value: any) {
    //let value = '';
    //if (event) value = event.target.value; //input data
    let result = [];
    
    if (value && value.length) { //checking whether field is empty
      result = this.allPhoneCodes.filter((keyword) => {
        return keyword.toLowerCase().includes(value.toLowerCase()); //finding corresponding words in an array
      });
      this.phoneCodesToOutput = result;
    } else {
      this.phoneCodesToOutput = this.allPhoneCodes;
    }
  }

  clearPhoneCodes() {
    //this.phoneCodeValue = ''; //clearing entered value
    this.countryCode?.setValue('+');
    //this.showPhoneCodes(null);
  }

  displayPhoneCodeValue(phoneCode: string) {
    this.countryCode?.setValue(phoneCode);
    this.countryCode?.updateValueAndValidity();
    this.phoneCodesToOutput = [];
  }

  formattedInputValue(value: string): string {
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

  formatNumeric(value: string, n: number): string {
    if (!value) return value;
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length >= 6) return `${numbers.slice(0,n)}`;
    return numbers;
  }

  //CODES STUIFF

  sendEmailCode() {
    this.verification_code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    //const email = this.email?.value;
    this.email?.setValue('yakymivyura@gmail.com');
    const email = this.email?.value;
    this.service.sendToEmail(email, this.verification_code).subscribe(
      (response: any) => {
        console.log(response);
        this.sendCodeDisabled = true;
        this.intervalId = setInterval(this.startTimer.bind(this), 1000);
      },
      error => {
        console.log('ERROR: ', error);
      }
    );
  }

  startTimer () {
    if (this.timerSeconds > 0) {
      this.timerSeconds--;
    } else {
      clearInterval(this.intervalId);
      this.sendCodeDisabled = false;
    }
  }


  //alert before reloading
  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any): void {
  //   if (this.unsavedChanges) {
  //     $event.returnValue = 'You have unsaved changes. Are you sure you want to leave this page?';
  //   }
  // }

}
