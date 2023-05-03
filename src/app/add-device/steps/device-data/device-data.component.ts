import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.css']
})
export class DeviceDataComponent implements OnInit, OnChanges {
  @Input('deviceData') deviceData!: FormGroup;
  @Output('deviceDataChange') deviceDataChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.deviceDataChange.emit(this.deviceData);
    console.log(this.deviceData)
  }

}
