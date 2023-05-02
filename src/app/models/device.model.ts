export type TEnergyClass = "APP"| "AP" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type TDeviceType = "refrigerator" | "stove" | "air conditioner" | "microwave" | "washing machine" | "dryer" | "dishwasher" | "computer" | "printer" | "boiler";

export interface IDevice {
  typeOfDevice: TDeviceType;
  power: number;
  energyClass: TEnergyClass;
  hoursPerMonth: number;
  carbonFootprint: number;
  warrantyInMonths: number;
}

export type INewDevice = Omit<IDevice, "carbonFootprint">
