import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class Reset {

  public responseMessage: string = '';
  public loginCredentials: { email: string} = { email: ''};
  showResetDiv: boolean = false;

  constructor(private http: HttpClient){}
  public reset(): void {
   
    const loginUrl = `https://api-ballerina.azurewebsites.net/users/resetPassword?email=${encodeURIComponent(this.loginCredentials.email)}`;

    this.http.post(loginUrl, {}).subscribe(
      () => {
        this.responseMessage = 'OK';
        this.showResetDiv = true;
      },
      (error) => {
        if (error.status === 202) {
          this.responseMessage = 'OK';
        } else {
          this.responseMessage = 'Coś poszło nie tak, sprawdz, czy wlączyłeś API';
        }
      }
    );
  }
}
