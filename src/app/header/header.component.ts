import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataStorageService } from '../shared/models/data-storage.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

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
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
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
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
