import {Component, OnInit} from '@angular/core';
import {DeviceService} from "../services/device.service";
import {IDevice} from '../models/device.model';

@Component({
  selector: 'app-compare-devices',
  templateUrl: './compare-devices.component.html',
  styleUrls: ['./compare-devices.component.css']
})
export class CompareDevicesComponent implements OnInit {
  devices!: IDevice[];
  firstDevice!: IDevice | null;
  secondDevice!: IDevice | null;
  reset = false;

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.devices = this.deviceService.fetchDevices();
  }

  onSelectDevice(uuid: string, deviceCount: number) {
    if (deviceCount === 1) {
      this.firstDevice = this.deviceService.getDevice(uuid)!;

      if (!this.secondDevice) {
        this.devices = this.devices.filter(device => {
          return device.typeOfDevice === this.firstDevice!.typeOfDevice
              && device.uuid !== this.firstDevice!.uuid;
        });
      }
    } else if (deviceCount === 2) {
      this.secondDevice = this.deviceService.getDevice(uuid)!;

      if (!this.firstDevice) {
        this.devices = this.devices.filter(device => {
          return device.typeOfDevice === this.secondDevice!.typeOfDevice
              && device.uuid !== this.secondDevice!.uuid;
        });
      }
    }
  }

  clearDevices() {
    this.firstDevice = null;
    this.secondDevice = null;
    this.reset = true;
    this.devices = this.deviceService.fetchDevices();

    setTimeout(() => {
      this.reset = false;
    }, 1);
  }
}
