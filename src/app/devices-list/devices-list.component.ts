import { Component, OnInit } from '@angular/core';
import {DeviceService} from "../services/device.service";
import {IDevice, TDeviceType} from "../models/device.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {
  devices: IDevice[] = [];

  constructor(private deviceService: DeviceService,
              private router: Router) { }

  ngOnInit(): void {
    this.devices = this.deviceService.fetchDevices();
  }

  onDelete(device: IDevice) {
    this.deviceService.deleteDevice(device);
    this.devices = this.deviceService.fetchDevices();
  }

  getDeviceTypeInLocalLanguage(deviceType: TDeviceType) {
    switch (deviceType) {
      case 'refrigerator':
        return 'хладилник';
      case 'stove':
        return 'печка';
      case "air conditioner":
        return 'климатик';
      case "boiler":
        return 'бойлер';
      case "computer":
        return 'компютър';
      case "dishwasher":
        return 'съдомиална';
      case "dryer":
        return 'сушилня';
      case "microwave":
        return 'микровълнова';
      case "printer":
        return 'принтер';
      case "washing machine":
        return 'пералня';
    }
  }

  async onEditDevice(device: IDevice) {
    await this.router.navigateByUrl('add');
    sessionStorage.setItem('add-device', JSON.stringify(device));
  }
}
