import { Component, OnInit } from '@angular/core';
import {DeviceService} from "../services/device.service";
import {IDevice} from "../models/device.model";


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

}
