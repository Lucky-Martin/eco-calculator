import {Component, Input, OnInit} from '@angular/core';
import {IDevice} from "../../models/device.model";

export interface IDeviceNode {
  name: string;
  children: IDeviceNode[];
}

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.css']
})
export class DeviceInfoComponent implements OnInit {
  @Input('device') device!: IDevice;

  constructor() { }

  ngOnInit(): void { }

}
