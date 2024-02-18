import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { Observable, Subscription } from 'rxjs';
// import { AuthResponseData } from '../shared/models/auth-response-data.model';
// import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import {
  CLEAR_ERROR_ACTION,
  LOGIN_START_ACTION,
  SIGNUP_START_ACTION,
} from './store/auth.actions';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, AlertComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error?: string | null;
  storeSub!: Subscription;
  constructor(
    // private authService: AuthService,
    // private router: Router,
    // private viewContentRef: ViewContainerRef,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authData) => {
      this.isLoading = authData.loading;
      this.error = authData.authError;
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    // let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(
        LOGIN_START_ACTION({ email: email, password: password })
      );
    } else {
      // authObs = this.authService.signUp(email, password);
      this.store.dispatch(
        SIGNUP_START_ACTION({ email: email, password: password })
      );
    }

    //I can use it here not to repeat myself and make a clean code
    // authObs.subscribe(
    //   (resData) => {
    //     console.log(resData);
    //     this.isLoading = false;

    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage) => {
    //     console.error(errorMessage);
    //     this.isLoading = false;
    //     // this.showErrorAlert(errorMessage);
    //     this.error = errorMessage;
    //   }
    // );
    authForm.reset();
  }
  // this to make it as an alert modal
  onHandleError() {
    // this.error = null;
    this.store.dispatch(CLEAR_ERROR_ACTION());
  }
  // private showErrorAlert(message: string) {
  //   // this won't work cause it's wrong in angular
  //   // const alertComp = new AlertComponent()
  //   const alertFactory = this.viewContentRef.createComponent(AlertComponent);
  //   return alertFactory;
  // }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
