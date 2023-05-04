import {Component, Inject, OnInit} from '@angular/core';
import {IDeviceFootprintData} from "../../../models/device.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-device-footprint-preview',
  templateUrl: './device-footprint-preview.component.html',
  styleUrls: ['./device-footprint-preview.component.css']
})
export class DeviceFootprintPreviewComponent implements OnInit {
  public deviceFootprint!: IDeviceFootprintData;
  constructor(@Inject(MAT_DIALOG_DATA) public deviceData: {deviceFootprint: IDeviceFootprintData}) { }

  ngOnInit(): void {
    this.deviceFootprint = this.deviceData.deviceFootprint;
  }

}
