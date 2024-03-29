import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { LOGOUT_ACTION } from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    // this.userSub = this.authService.user.subscribe((user) => {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        // this.isAuthenticated = user ? true : false; we can use another way
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    this.dataStorageService.storeData();
  }
  onFetchData() {
    this.dataStorageService.fetchData().subscribe();
  }
  onLogout() {
    // this.authService.logout();
    this.store.dispatch(LOGOUT_ACTION());
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
