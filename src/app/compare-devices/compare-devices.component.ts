import { Component, OnInit } from '@angular/core';
import {DeviceService} from "../services/device.service";
import { IDevice } from '../models/device.model';

@Component({
  selector: 'app-compare-devices',
  templateUrl: './compare-devices.component.html',
  styleUrls: ['./compare-devices.component.css']
})
export class CompareDevicesComponent implements OnInit {
  devices!: IDevice[];
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.devices = this.deviceService.fetchDevices();
  }
}
