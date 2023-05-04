import {Injectable} from '@angular/core';
import {INewDevice} from "../models/device.model";
import {StatisticData} from "../models/statistics";
import {CostPerKilowattHour} from "../types/costPerKilowattHour";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  constructor() { }

  static calculateElectricityConsummationPerMonth(newDevice: INewDevice) {
    return Number((newDevice.workingHours * newDevice.power).toFixed(3));
  }

  static calculateElectricityDeviceCostForMonth(newDevice: INewDevice) {
    const monthlyEnergyConsumption = newDevice.workingHours * newDevice.power;
    return Number((monthlyEnergyConsumption * this.costPerKilowattHour()).toFixed(3));
  }

  static calculateElectricityDeviceConsumptionForLifetime(newDevice: INewDevice) {
    return Number((newDevice.power * newDevice.workingHours * newDevice.warrantyInMonths).toFixed(3));
  }

  static calculateElectricityDeviceCostForLifetime(newDevice: INewDevice) {
    const lifetimeEnergyConsumption = newDevice.power * newDevice.workingHours * newDevice.warrantyInMonths;
    return Number((lifetimeEnergyConsumption * this.costPerKilowattHour()).toFixed(3));
  }

  /**
   * @returns the carbon footprint for the device lifetime in kilograms
   * */
  static calculateCarbonFootprint(newDevice: INewDevice) {
    const lifetimeEnergyConsumption = newDevice.power * newDevice.workingHours * newDevice.warrantyInMonths;
    return Number(((lifetimeEnergyConsumption * StatisticData.GramsOfCarbonEmissionsPerkWh2021) / 1000).toFixed(3));
  }

  static calculateEnergyEfficiency(newDevice: INewDevice) {
    return newDevice.energyClass;
  }

  private static costPerKilowattHour(): number {
    return Number(((CostPerKilowattHour.ElectroholdDay + CostPerKilowattHour.EVNBulgariaDay + CostPerKilowattHour.EnergoProDay) / 3).toFixed(5));
  }
}
