import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyB0xX7FJdLBTD1M-Ohwc6fbHDB8ygUrbWM]',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
  login() {}
}
