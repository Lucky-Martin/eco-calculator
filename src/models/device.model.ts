export type TEnergyClass = "APP"| "AP" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type TDeviceType = "refrigerator" | "stove" | "air conditioner" | "microwave" | "washing machine" | "dryer" | "dishwasher" | "computer" | "printer";

export interface IDevice {
  typeOfDevice: TDeviceType,
  power: number,
  energyClass: TEnergyClass,
  hoursPerMonth: number,
  warrantyInMonths: number
}
