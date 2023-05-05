import {Component, OnInit} from '@angular/core';
import {DeviceService} from "../services/device.service";
import {IDevice, IDevices} from '../models/device.model';

@Component({
  selector: 'app-compare-devices',
  templateUrl: './compare-devices.component.html',
  styleUrls: ['./compare-devices.component.css']
})
export class CompareDevicesComponent implements OnInit {
  devicesToChoose!: IDevice[];
  firstDevice!: IDevice | null;
  secondDevice!: IDevice | null;
  firstDeviceHighlight!: string[] | null;
  secondDeviceHighlight!: string[] | null;
  reset = false;
  private readonly allDevices: IDevices;

  constructor(private deviceService: DeviceService) {
    this.allDevices = deviceService.fetchDevices();
  }

  ngOnInit(): void {
    this.devicesToChoose = this.allDevices;

    const device = JSON.parse(sessionStorage.getItem('compare-device')!);
    if (device) this.firstDevice = device;

    if (this.firstDevice)
      this.filterDevices(this.firstDevice)

  }

  onSelectDevice(uuid: string, deviceCount: number) {
    if (deviceCount === 1) {
      this.firstDevice = this.deviceService.getDevice(uuid)!;

      this.filterDevices(this.firstDevice);
    } else if (deviceCount === 2) {
      this.secondDevice = this.deviceService.getDevice(uuid)!;

      this.filterDevices(this.secondDevice);
    }

    const diff = this.deviceService.compareDevice(this.firstDevice!, this.secondDevice!);
    if (diff) {
      this.firstDeviceHighlight = diff.betterInFirstDevice;
      this.secondDeviceHighlight = diff.betterInSecondDevice;
    }
  }

  private filterDevices(selectedDevice: IDevice){
    this.devicesToChoose = this.allDevices.filter(device => device.typeOfDevice === selectedDevice!.typeOfDevice);
  }

  clearDevices() {
    this.firstDevice = null;
    this.firstDeviceHighlight = null;
    this.secondDevice = null;
    this.secondDeviceHighlight = null;
    this.reset = true;
    this.devicesToChoose = this.allDevices;

    setTimeout(() => {
      this.reset = false;
    }, 1);
  }
}
