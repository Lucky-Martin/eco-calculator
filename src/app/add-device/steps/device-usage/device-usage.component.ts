import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-device-usage',
  templateUrl: './device-usage.component.html',
  styleUrls: ['./device-usage.component.css']
})
export class DeviceUsageComponent implements OnChanges {
  @Input() hoursUsed!: number;
  @Output() hoursUsedChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnChanges() {
    this.hoursUsedChange.emit(this.hoursUsed);
  }

}
