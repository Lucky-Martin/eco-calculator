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

  compareDevice(firstDevice: IDevice | null, secondDevice: IDevice | null) {
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
            if (firstValue.electricityConsummationPerMonth < secondValue.electricityConsummationPerMonth) betterInFirstDevice.push("carbonFootprint.electricityConsummationPerMonth");
            else if (firstValue.electricityConsummationPerMonth > secondValue.electricityConsummationPerMonth) betterInSecondDevice.push("carbonFootprint.electricityConsummationPerMonth");

            if (firstValue.electricityDeviceCostForMonth < secondValue.electricityDeviceCostForMonth) betterInFirstDevice.push("carbonFootprint.electricityDeviceCostForMonth");
            else if (firstValue.electricityDeviceCostForMonth > secondValue.electricityDeviceCostForMonth) betterInSecondDevice.push("carbonFootprint.electricityDeviceCostForMonth");

            if (firstValue.electricityDeviceConsumptionForLifetime < secondValue.electricityDeviceConsumptionForLifetime) betterInFirstDevice.push("carbonFootprint.electricityDeviceConsumptionForLifetime");
            else if (firstValue.electricityDeviceConsumptionForLifetime > secondValue.electricityDeviceConsumptionForLifetime) betterInSecondDevice.push("carbonFootprint.electricityDeviceConsumptionForLifetime");

            if (firstValue.electricityDeviceCostForLifetime < secondValue.electricityDeviceCostForLifetime) betterInFirstDevice.push("carbonFootprint.electricityDeviceCostForLifetime");
            else if (firstValue.electricityDeviceCostForLifetime > secondValue.electricityDeviceCostForLifetime) betterInSecondDevice.push("carbonFootprint.electricityDeviceCostForLifetime");

            if (firstValue.carbonFootprint < secondValue.carbonFootprint) betterInFirstDevice.push("carbonFootprint.carbonFootprint");
            else if (firstValue.carbonFootprint > secondValue.carbonFootprint) betterInSecondDevice.push("carbonFootprint.carbonFootprint");

            if(EnergyClass[firstValue.energyEfficiency] < EnergyClass[secondValue.energyEfficiency]) betterInFirstDevice.push("carbonFootprint.energyEfficiency")
            else if (EnergyClass[firstValue.energyEfficiency] > EnergyClass[secondValue.energyEfficiency]) betterInSecondDevice.push("carbonFootprint.energyEfficiency")

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
