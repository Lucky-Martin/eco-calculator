import {Component, Input, OnInit} from '@angular/core';
import {IDeviceFootprintData} from "../../../models/device.model";

@Component({
  selector: 'app-device-score',
  templateUrl: './device-score.component.html',
  styleUrls: ['./device-score.component.css']
})
export class DeviceScoreComponent implements OnInit {
  @Input('carbonFootprint') footprint!: IDeviceFootprintData;

  constructor() { }

  ngOnInit(): void {
  }

}
