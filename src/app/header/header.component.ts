import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataStorageService } from '../shared/models/data-storage.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls:[ './header.component.css'],
})
export class HeaderComponent {
  constructor(private dataStorage: DataStorageService) {}
  onSaveData() {
    this.dataStorage.storeData();
  }
}
