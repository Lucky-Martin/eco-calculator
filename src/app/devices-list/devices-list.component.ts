import { Component, OnInit } from '@angular/core';
import {DeviceService} from "../services/device.service";
import {IDevice} from "../models/device.model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeviceFootprintPreviewComponent} from "./dialogs/device-footprint-preview/device-footprint-preview.component";
import {getDeviceTypeInLocalLanguage} from "../functions/getDeviceTypeInLocalLanguage";

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {
  devices: IDevice[] = [];

  constructor(private deviceService: DeviceService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.devices = this.deviceService.fetchDevices();
  }

  onDelete(device: IDevice) {
    this.deviceService.deleteDevice(device);
    this.devices = this.deviceService.fetchDevices();
  }

  async onPreviewDeviceInfo(device: IDevice) {
    this.dialog.open(DeviceFootprintPreviewComponent, {
      maxWidth: '90vw',
      width: '100%',
      data: {deviceFootprint: device.carbonFootprint}
    });
  }

  async onEditDevice(device: IDevice) {
    await this.router.navigateByUrl('add');
    sessionStorage.setItem('add-device', JSON.stringify(device));
  }

  async onCompare(device: IDevice) {
    await this.router.navigateByUrl('compare');
    sessionStorage.setItem('compare-device', JSON.stringify(device));
  }

  protected readonly getDeviceTypeInLocalLanguage = getDeviceTypeInLocalLanguage;
}
