
  import { HttpClient } from '@angular/common/http';
  import { MatTooltip } from '@angular/material/tooltip';
  import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
  import { Validation } from './validation';
  import {MatSnackBar} from '@angular/material/snack-bar';  
  import { TabService } from '../services/tab.service';
  import {Component, OnInit} from '@angular/core';


  @Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
  export class Register  implements OnInit  {
    tooltip: MatTooltip | undefined;
    hide: boolean = true;
    form: FormGroup;
    showDetails: boolean| undefined;

    public loginCredentials: { email: string, password: string, repeatPassword: string } = { email: '', password: '', repeatPassword: '' };
    public emailError: string = '';
    public passwordError: string = '';
    public repeatPasswordError: string = '';
    public responseMessage: string = '';
    public showEmailError: boolean = false;
    public showPasswordError: boolean = false;
    public showRepeatPasswordError: boolean = false;
    
    constructor(private http: HttpClient, private fb: FormBuilder,private tabService: TabService, private _snackBar: MatSnackBar) {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]]
      });
    }

 

    ngOnInit() {
    }

    onStrengthChanged(strength: number) {
      console.log('password strength = ', strength);
    }
  
    get password() {
      return this.form.get('password');
    }

    public newUser(): void {

      if (!Validation.isEmailValid(this.loginCredentials.email)) {
        this.showEmailError = true;
        this.emailError = 'Niepoprawny format emaila';
        return;
      } else {
        this.showEmailError = false;
      }
    
      if (!Validation.isPasswordValid(this.loginCredentials.password)) {
        this.showPasswordError = true;
        this.passwordError = 'Niepoprawne hasło. Upewnij się, że zawiera co najmniej 1 cyfrę, 1 małą literę, 1 wielką literę i co najmniej 8 znaków.';
        return;
      } else {
        this.showPasswordError = false;
      }

      if (this.loginCredentials.password !== this.loginCredentials.repeatPassword) {
        this.showRepeatPasswordError = true;
        this.repeatPasswordError ='Wprowadzone hasła nie są identyczne';
        return;
      }else {
        this.showRepeatPasswordError = false;
      }
        
      const registerURL = `https://api-ballerina.azurewebsites.net/users?email=${encodeURIComponent(this.loginCredentials.email)}&password=${encodeURIComponent(this.loginCredentials.password)}`;
    
      this.http.post(registerURL, {}).subscribe(
        () => {
          console.log("Correct reqest"); 
          this.changeTab();
          this.openSnackBar();
          
        },
        (error) => {
        
          this.responseMessage = 'Coś poszło nie tak, sprawdz,czy API jest uruchomione';
          this.form.get('email')?.markAsTouched();
          this.form.get('password')?.markAsTouched();
        }
      );
    }

    changeTab(): void { 
      const currentIndex = this.tabService.getSelectedIndex();
      if (currentIndex === 0) {
        this.tabService.setSelectedIndex(-1);
      } else {
        this.tabService.setSelectedIndex(0);
      }
    }

    openSnackBar() {
      this._snackBar.open('Rejestracja przebiegla pomyslnie!', 'Zamknij', {
        duration: 3000,   verticalPosition: 'top',panelClass: ['custom-action-button']
      });
    }

  
  }
    
    

