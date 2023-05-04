import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-device-usage',
  templateUrl: './device-usage.component.html',
  styleUrls: ['./device-usage.component.css']
})
export class DeviceUsageComponent {
  @Input() hoursUsed!: number;
  @Output() hoursUsedChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() calculateEfficiency = new EventEmitter<undefined>();

  constructor() { }

  onHoursChange(hours: string) {
    this.hoursUsed = Number(hours);
    this.hoursUsedChange.emit(this.hoursUsed);
  }

  submitForm() {
    this.calculateEfficiency.emit();
  }
}
