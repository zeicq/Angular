import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class Login {
  hide: boolean = true;
  public getJsonValue: any;
  public postJsonValue: any;
  public loginCredentials: { email: string, password: string } = { email: '', password: '' };
  public responseMessage: string = '';


  constructor(private http: HttpClient ,private router: Router) {}
  
  onResetClick(): void {
    this.router.navigate(['/reset']);
   }

  public login(): void {

    if(this.loginCredentials.email =='' || this.loginCredentials.password ==''){
        this.loginCredentials.email='';
    }

    if (!this.isValidEmailFormat(this.loginCredentials.email)) {
      this.responseMessage = 'Niepoprawny format emaila.';
      return;
  }
    const loginUrl = `https://api-ballerina.azurewebsites.net/auth/login?email=${encodeURIComponent(this.loginCredentials.email)}&password=${encodeURIComponent(this.loginCredentials.password)}`;

    this.http.post(loginUrl, {}).subscribe(
      () => {
        this.loginCredentials.email='';
        this.loginCredentials.password='';
        this.responseMessage = 'Zalogowałeś się poprawnie!';
        setTimeout(() => {
          this.responseMessage = ''; 
        }, 4000); 
      },
      error => {
        this.responseMessage = 'Błędne hasło';
        setTimeout(() => {
          this.responseMessage = ''; 
        }, 4000); 
      }
    );
  }

  isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

}
 

