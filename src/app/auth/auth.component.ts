import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true;
  constructor(private authService: AuthService) {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    if (this.isLoginMode) {
    } else {
      this.authService.signUp(email, password).subscribe((resData) => {
        console.log(resData)
      },error=>console.error(error)
      );
    }
    authForm.reset();
  }
}
