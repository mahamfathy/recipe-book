import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() message?:string
  @Output() close =new EventEmitter<void>()

  onClose(){
    this.close.emit()
  }
}
