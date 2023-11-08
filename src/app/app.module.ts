import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { Login } from './login/login.component';
import { Register } from './register/register.component';
import { Reset } from './reset/reset.component';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';


@NgModule({
  declarations: [
    AppComponent,
    Login,
    Register,
    Reset
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule, MatSelectModule, MatFormFieldModule,
    MatInputModule,MatIconModule,MatButtonModule,MatTabsModule,MatTooltipModule, MatSnackBarModule,MatPasswordStrengthModule,
    RouterModule.forRoot([
      { path: 'reset', component: Reset }, 
      { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  hide: boolean = true;
   
 }

