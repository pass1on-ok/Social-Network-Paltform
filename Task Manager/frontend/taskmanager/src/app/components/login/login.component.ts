import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.login(this.loginData.email, this.loginData.password)
        .subscribe(
          data => {
            // Navigate to home or dashboard
          },
          error => {
            console.error('Login failed', error);
          }
        );
    }
  }
  
}
