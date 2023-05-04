import {Injectable} from '@angular/core';
import {
  ComparedDevicesResult,
  Device,
  DeviceProps,
  Devices, EnergyClass,
  IDevice,
  IDevices,
  INewDevice
} from "../models/device.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  //Custom implementation with firebase planned!!! (using localstorage for easier data state management)
  private storageId: string = 'devices';

  constructor() {
  }

  getDevice(uuid: string) {
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

    const deviceInstance = new Device(devices[deviceIndex]);
    console.log(deviceInstance)
    deviceInstance.UpdateDevice(device);
    devices[deviceIndex] = deviceInstance;
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

  compareDevice(firstDevice: IDevice, secondDevice: IDevice) {
    if (!firstDevice || !secondDevice) return;
    else if (firstDevice.typeOfDevice !== secondDevice.typeOfDevice) return;

    const betterInFirstDevice: DeviceProps = [];
    const betterInSecondDevice: DeviceProps = [];


    for (const [firstKey, firstValue] of Object.entries(firstDevice)) {
      for (const [secondKey, secondValue] of Object.entries(secondDevice)) {
        if (firstKey === secondKey && firstKey !== "uuid" && firstKey !== "name") {
          if (firstKey === "power" || firstKey === "workingHours") {
            if (firstValue < secondValue) betterInFirstDevice.push(firstKey)
            else if (firstValue > secondValue) betterInSecondDevice.push(firstKey)
          } else if (firstKey === "warrantyInMonths") {
            if (firstValue > secondValue) betterInFirstDevice.push("warrantyInMonths");
            else if (firstValue < secondValue) betterInSecondDevice.push("warrantyInMonths");
          } else if (firstKey === "energyClass"){
            if(EnergyClass[firstValue] < EnergyClass[secondValue]) betterInFirstDevice.push("energyClass")
            else if (EnergyClass[firstValue] > EnergyClass[secondValue]) betterInSecondDevice.push("energyClass")
          } else if (firstKey === "carbonFootprint") {
            if (firstValue.electricityConsummationPerMonth < secondValue.electricityConsummationPerMonth) betterInFirstDevice.push("electricityConsummationPerMonth");
            else if (firstValue.electricityConsummationPerMonth > secondValue.electricityConsummationPerMonth) betterInSecondDevice.push("electricityConsummationPerMonth");

            if (firstValue.electricityDeviceCostForMonth < secondValue.electricityDeviceCostForMonth) betterInFirstDevice.push("electricityDeviceCostForMonth");
            else if (firstValue.electricityDeviceCostForMonth > secondValue.electricityDeviceCostForMonth) betterInSecondDevice.push("electricityDeviceCostForMonth");

            if (firstValue.electricityDeviceConsumptionForLifetime < secondValue.electricityDeviceConsumptionForLifetime) betterInFirstDevice.push("electricityDeviceConsumptionForLifetime");
            else if (firstValue.electricityDeviceConsumptionForLifetime > secondValue.electricityDeviceConsumptionForLifetime) betterInSecondDevice.push("electricityDeviceConsumptionForLifetime");

            if (firstValue.electricityDeviceCostForLifetime < secondValue.electricityDeviceCostForLifetime) betterInFirstDevice.push("electricityDeviceCostForLifetime");
            else if (firstValue.electricityDeviceCostForLifetime > secondValue.electricityDeviceCostForLifetime) betterInSecondDevice.push("electricityDeviceCostForLifetime");

            if (firstValue.carbonFootprint < secondValue.carbonFootprint) betterInFirstDevice.push("carbonFootprint");
            else if (firstValue.carbonFootprint > secondValue.carbonFootprint) betterInSecondDevice.push("carbonFootprint");

            if(EnergyClass[firstValue.energyEfficiency] < EnergyClass[secondValue.energyEfficiency]) betterInFirstDevice.push("energyEfficiency")
            else if (EnergyClass[firstValue.energyEfficiency] > EnergyClass[secondValue.energyEfficiency]) betterInSecondDevice.push("energyEfficiency")

          }
        }
      }
    }

    const compareResult: ComparedDevicesResult = {
      betterInFirstDevice,
      betterInSecondDevice
    };
    return compareResult;
  }

  private convertInterfacesToClassesDevice(interfaceDevices: IDevices): Devices {
    return interfaceDevices.map(currDevice => new Device(currDevice));
  }

  private saveDevices(devices: IDevice[]) {
    localStorage.setItem(this.storageId, JSON.stringify(devices));
  }
}
