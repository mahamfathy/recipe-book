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
  constructor(private authService:AuthService){}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(authForm: NgForm) {
    console.log(authForm);
    authForm.reset();
  }
}
