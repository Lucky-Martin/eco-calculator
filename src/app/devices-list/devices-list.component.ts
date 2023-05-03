import { Component, OnInit } from '@angular/core';
import {DeviceService} from "../services/device.service";
import {IDevice, TDeviceType} from "../models/device.model";


@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {
  devices: IDevice[] = [];

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.devices = this.deviceService.fetchDevices();
  }

  getDeviceTypeInLocalLanguage(deviceType: TDeviceType) {
    switch (deviceType) {
      case 'refrigerator':
        return 'хладилник';
        break;
      case 'stove':
        return 'печка';
        break;
      case "air conditioner":
        return 'климатик';
        break;
      case "boiler":
        return 'бойлер';
        break;
      case "computer":
        return 'компютър';
        break;
      case "dishwasher":
        return 'съдомиална';
        break;
      case "dryer":
        return 'сушилня';
        break;
      case "microwave":
        return 'микровълнова';
        break;
      case "printer":
        return 'принтер';
        break;
      case "washing machine":
        return 'пералня';
        break;
    }
  }

}
