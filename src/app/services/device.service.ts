import {Injectable} from '@angular/core';
import {Device, Devices, IDevice, IDevices, INewDevice} from "../models/device.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  //Custom implementation with firebase planned!!! (using localstorage for easier data state management)
  private storageId: string = 'devices';
  constructor() { }

  getDevice(uuid: string){
    const devices = this.fetchDevices();
    return devices.find(value => value.uuid === uuid);
  }

  addDevice(newDevice: INewDevice) {
    const devices = this.fetchDevices();
    const device = new Device(newDevice);
    devices.push(device);
    this.saveDevices(devices);
  }

  updateDevice(device: IDevice) {
    const devices = this.fetchDevices();
    const deviceIndex = devices.findIndex(deviceFromList => deviceFromList.uuid === device.uuid);

    devices[deviceIndex].UpdateDevice(device);
    this.saveDevices(devices);
  }

  deleteDevice(device: IDevice) {
    const devices = this.fetchDevices().filter(currDevice => currDevice.uuid !== device.uuid);

    this.saveDevices(devices);
  }

  fetchDevices(): Devices {
    const localDevicesList: IDevices | "undefined" = JSON.parse(localStorage.getItem(this.storageId)!);
    if (!localDevicesList || localDevicesList === 'undefined') return [];

    return this.convertInterfacesToClassesDevice(localDevicesList);
  }

  private convertInterfacesToClassesDevice (interfaceDevices: IDevices): Devices {
    return interfaceDevices.map(currDevice =>  new Device(currDevice));
  }

  private saveDevices(devices: IDevice[]) {
    localStorage.setItem(this.storageId, JSON.stringify(devices));
  }
}
