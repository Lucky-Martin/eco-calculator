export type TEnergyClass = "APP"| "AP" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type TDeviceType = "refrigerator" | "stove" | "air conditioner" | "microwave" | "washing machine" | "dryer" | "dishwasher" | "computer" | "printer" | "boiler";

export interface IDevice {
  uuid: string;
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
  energyEfficiency: number;
}

export type INewDevice = Omit<IDevice, "carbonFootprint" | "uuid">
