import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataStorageService } from '../shared/models/data-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls:[ './header.component.css'],
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}
  onSaveData() {
    this.dataStorageService.storeData();
  }
onFetchData(){
  this.dataStorageService.fetchData()
}
}
