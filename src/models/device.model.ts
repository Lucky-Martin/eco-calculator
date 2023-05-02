export interface Device {
  typeOfDevice: "refrigerator" | "stove" | "air conditioner" | "microwave" | "washing machine" | "dryer" | "dishwasher" | "computer" | "printer",
  power: number,
  energyClass: "APP"| "AP" | "A" | "B" | "C" | "D" | "E" | "F" | "G",
  hoursPerMonth: number,
  warrantyInMonths: number
}
