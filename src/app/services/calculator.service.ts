import {Injectable} from '@angular/core';
import {INewDevice} from "../models/device.model";
import {StatisticData} from "../models/statistics";
import {CostPerKilowattHour} from "../types/costPerKilowattHour";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() {
  }

  static calculateElectricityConsummationPerMonth(newDevice: INewDevice) {
    return newDevice.workingHours * newDevice.power;
  }

  static calculateElectricityDeviceCostForMonth(newDevice: INewDevice) {
    const monthlyEnergyConsumption = newDevice.workingHours * newDevice.power;
    return monthlyEnergyConsumption * this.costPerKilowattHour();
  }

  static calculateElectricityDeviceConsumptionForLifetime(newDevice: INewDevice) {
    return newDevice.power * newDevice.workingHours * newDevice.warrantyInMonths;
  }

  static calculateElectricityDeviceCostForLifetime(newDevice: INewDevice) {
    const lifetimeEnergyConsumption = newDevice.power * newDevice.workingHours * newDevice.warrantyInMonths;
    return lifetimeEnergyConsumption * this.costPerKilowattHour();
  }

  /**
   * @returns the carbon footprint for the device lifetime in kilograms
   * */
  static calculateCarbonFootprint(newDevice: INewDevice) {
    const lifetimeEnergyConsumption = newDevice.power * newDevice.workingHours * newDevice.warrantyInMonths;
    return (lifetimeEnergyConsumption * StatisticData.GramsOfCarbonEmissionsPerkWh2021) / 1000;
  }

  static calculateEnergyEfficiency(newDevice: INewDevice) {
    return newDevice.energyClass;
  }

  private static costPerKilowattHour(): number {
    return parseFloat(((CostPerKilowattHour.ElectroholdDay + CostPerKilowattHour.EVNBulgariaDay + CostPerKilowattHour.EnergoProDay) / 3).toFixed(5))
  }
}
