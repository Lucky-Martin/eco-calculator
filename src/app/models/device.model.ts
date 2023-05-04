import {generateUID} from "../functions/generateUID";
import {CalculatorService} from "../services/calculator.service";

export type TEnergyClass = "APP"| "AP" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type TDeviceType = "refrigerator" | "stove" | "air conditioner" | "microwave" | "washing machine" | "dryer" | "dishwasher" | "computer" | "printer" | "boiler";

export type DeviceProp = "power" | "energyClass" | "warrantyInMonths" | "workingHours" | "carbonFootprint.electricityConsummationPerMonth" | "carbonFootprint.electricityDeviceCostForMonth" | "carbonFootprint.electricityDeviceConsumptionForLifetime" | "carbonFootprint.electricityDeviceCostForLifetime" | "carbonFootprint.carbonFootprint" | "carbonFootprint.energyEfficiency";
export type DeviceProps = DeviceProp[];

export type IDevices = IDevice[];
export type Devices = Device[];

export interface IDevice {
  readonly uuid: string;
  name: string;
  typeOfDevice: TDeviceType;
  power: number;
  energyClass: TEnergyClass;
  warrantyInMonths: number;
  workingHours: number;
  carbonFootprint: IDeviceFootprintData;
}

export interface IDeviceFootprintData {
  electricityConsummationPerMonth: number;
  electricityDeviceCostForMonth: number;
  electricityDeviceConsumptionForLifetime: number;
  electricityDeviceCostForLifetime: number;
  carbonFootprint: number;
  energyEfficiency: TEnergyClass;
}

export type INewDevice = Omit<IDevice, "carbonFootprint" | "uuid">

export interface ComparedDevicesResult {
  betterInFirstDevice: DeviceProps,
  betterInSecondDevice: DeviceProps
}

export class Device implements IDevice {
  readonly uuid: string;

  name: string;
  typeOfDevice: TDeviceType;
  power: number;
  energyClass: TEnergyClass;
  workingHours: number;
  warrantyInMonths: number;
  carbonFootprint: IDeviceFootprintData;



  constructor(newDevice: INewDevice | IDevice) {
    if("uuid" in newDevice) this.uuid = newDevice.uuid;
    else this.uuid = generateUID();

    this.name = newDevice.name;
    this.typeOfDevice = newDevice.typeOfDevice;
    this.power = newDevice.power;
    this.energyClass = newDevice.energyClass;
    this.workingHours = newDevice.workingHours;
    this.warrantyInMonths = newDevice.warrantyInMonths;
    this.carbonFootprint = this.CalculateData(newDevice);
  }

  UpdateDevice(updatedDevice: IDevice){
    this.name = updatedDevice.name;
    this.typeOfDevice = updatedDevice.typeOfDevice;
    this.power = updatedDevice.power;
    this.energyClass = updatedDevice.energyClass;
    this.workingHours = updatedDevice.workingHours;
    this.warrantyInMonths = updatedDevice.warrantyInMonths;
    this.carbonFootprint = this.CalculateData(updatedDevice);
  }

  GetAllData() {
    const data: IDevice = {
      uuid: this.uuid,
      energyClass: this.energyClass,
      name: this.name,
      typeOfDevice: this.typeOfDevice,
      power: this.power,
      workingHours: this.workingHours,
      warrantyInMonths: this.warrantyInMonths,
      carbonFootprint: this.carbonFootprint
    }
    return data;
  }

  private CalculateData(uncalculatedDevice: INewDevice) {
    const calculatedData: IDeviceFootprintData = {
      electricityConsummationPerMonth: CalculatorService.calculateElectricityConsummationPerMonth(uncalculatedDevice),
      electricityDeviceCostForMonth: CalculatorService.calculateElectricityDeviceCostForMonth(uncalculatedDevice),
      electricityDeviceConsumptionForLifetime: CalculatorService.calculateElectricityDeviceConsumptionForLifetime(uncalculatedDevice),
      electricityDeviceCostForLifetime: CalculatorService.calculateElectricityDeviceCostForLifetime(uncalculatedDevice),
      carbonFootprint: CalculatorService.calculateCarbonFootprint(uncalculatedDevice),
      energyEfficiency: CalculatorService.calculateEnergyEfficiency(uncalculatedDevice)
    }

    return calculatedData;
  }
}
