import { Injectable } from '@angular/core';
import {Device, IDevice, INewDevice} from "../models/device.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  //Custom implementation with firebase planned!!! (using localstorage for easier data state management)
  private storageId: string = 'devices';
  constructor() { }

  addDevice(newDevice: INewDevice) {
    let devices = this.fetchDevices();
    const device = new Device(newDevice);
    devices.push(device);
    this.saveDevices(devices);
  }

  updateDevice(device: IDevice) {
    let devices = this.fetchDevices();
    let deviceIndex = devices.findIndex(deviceFromList => {
      return deviceFromList.name === device.name;
    });

    devices[deviceIndex] = device;
    this.saveDevices(devices);
  }

  deleteDevice(device: IDevice) {
    let devices = this.fetchDevices();
    let deviceIndex = devices.findIndex(deviceFromList => {
      return deviceFromList.name === device.name;
    });

    if (deviceIndex > -1) {
      devices.splice(deviceIndex, 1);
    }

    this.saveDevices(devices);
  }

  fetchDevices(): IDevice[] {
    let devicesList = JSON.parse(localStorage.getItem(this.storageId)!);
    if (!devicesList || devicesList === 'undefined') {
      devicesList = [];
    }

    return devicesList;
  }

  saveDevices(devices: IDevice[]) {
    localStorage.setItem(this.storageId, JSON.stringify(devices));
  }
}
