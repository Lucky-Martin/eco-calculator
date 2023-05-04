import { Component, OnInit } from '@angular/core';
import {DeviceService} from "../services/device.service";
import { IDevice } from '../models/device.model';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-compare-devices',
  templateUrl: './compare-devices.component.html',
  styleUrls: ['./compare-devices.component.css']
})
export class CompareDevicesComponent implements OnInit {
  devices!: IDevice[];
  firstDevice!: IDevice;
  secondDevice!: IDevice;

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.devices = this.deviceService.fetchDevices();
  }

  onSelectDevice(uuid: string, deviceCount: number) {
    if (deviceCount === 1) {
      this.firstDevice = this.deviceService.getDevice(uuid)!;
    } else if (deviceCount === 2) {
      this.secondDevice = this.deviceService.getDevice(uuid)!;
    }
  }
}
