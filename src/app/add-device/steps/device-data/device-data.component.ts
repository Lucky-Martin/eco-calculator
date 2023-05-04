import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.css']
})
export class DeviceDataComponent implements OnInit {
  @Input('deviceData') deviceData!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
}
