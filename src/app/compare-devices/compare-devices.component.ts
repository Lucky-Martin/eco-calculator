import {Component, OnInit} from '@angular/core';
import {DeviceService} from "../services/device.service";
import { IDevice, IDevices } from '../models/device.model';

@Component({
  selector: 'app-compare-devices',
  templateUrl: './compare-devices.component.html',
  styleUrls: ['./compare-devices.component.css']
})
export class CompareDevicesComponent implements OnInit {
  devices!: IDevice[];
  firstDevice!: IDevice | null;
  secondDevice!: IDevice | null;
  firstDeviceHighlight!: string[] | null;
  secondDeviceHighlight!: string[] | null;
  reset = false;
  private allDevices!: IDevice[];

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.devices = this.deviceService.fetchDevices();
    this.allDevices = this.devices;
  }

  onSelectDevice(uuid: string, deviceCount: number) {
    if (deviceCount === 1) {
      this.firstDevice = this.deviceService.getDevice(uuid)!;

      if (!this.secondDevice) {
        this.devices = this.devices.filter(device => {
          return device.typeOfDevice === this.firstDevice!.typeOfDevice
        });
      }
    } else if (deviceCount === 2) {
      this.secondDevice = this.deviceService.getDevice(uuid)!;

      if (!this.firstDevice) {
        this.devices = this.devices.filter(device => {
          return device.typeOfDevice === this.secondDevice!.typeOfDevice;
        });
      }
    }

    const diff = this.deviceService.compareDevice(this.firstDevice!, this.secondDevice!);
    if (diff) {
      this.firstDeviceHighlight = diff.betterInFirstDevice;
      this.secondDeviceHighlight = diff.betterInSecondDevice;
    }
  }

  clearDevices() {
    this.firstDevice = null;
    this.firstDeviceHighlight = null;
    this.secondDevice = null;
    this.secondDeviceHighlight = null;
    this.reset = true;
    this.devices = this.deviceService.fetchDevices();

    setTimeout(() => {
      this.reset = false;
    }, 1);
  }
}
