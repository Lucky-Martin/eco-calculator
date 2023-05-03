import {Injectable} from '@angular/core';
import {INewDevice} from "../models/device.model";
import {DomesticClientType} from "../models/domesticClients.model";
import {StatisticData} from "../models/statistics";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  calculateElectricityConsummationPerMonth(newDevice: INewDevice) {
    return newDevice.workingHours * newDevice.power;
  }

  calculateElectricityDeviceCostForMonth(newDevice: INewDevice) {
    const monthlyEnergyConsumption = newDevice.workingHours * newDevice.power;
    const annualEnergyConsumption = newDevice.power * newDevice.workingHours * 12;
    return monthlyEnergyConsumption * this.domesticClientType(annualEnergyConsumption);
  }

  calculateElectricityDeviceConsumptionForLifetime(newDevice: INewDevice) {
    return newDevice.power * newDevice.workingHours * newDevice.warrantyInMonths;
  }
  calculateElectricityDeviceCostForLifetime(newDevice: INewDevice) {
    const annualEnergyConsumption = newDevice.power * newDevice.workingHours * 12;
    const lifetimeEnergyConsumption = newDevice.power * newDevice.workingHours * newDevice.warrantyInMonths;
    return lifetimeEnergyConsumption * this.domesticClientType(annualEnergyConsumption);
  }

  /**
   * @returns the carbon footprint for the device lifetime in kilograms
   * */
  calculateCarbonFootprint(newDevice: INewDevice) {
    const lifetimeEnergyConsumption = newDevice.power * newDevice.workingHours * newDevice.warrantyInMonths;
    return (lifetimeEnergyConsumption * StatisticData.GramsOfCarbonEmissionsPerkWh2021) / 1000;
  }

  calculateEnergyEfficiency(newDevice: INewDevice) {
    return 1;
  }

  private domesticClientType(annualEnergyConsumption: number): DomesticClientType {
    if (annualEnergyConsumption < 1_000) return DomesticClientType.D1
    else if (annualEnergyConsumption < 2_500) return DomesticClientType.D2
    else if (annualEnergyConsumption < 5_000) return DomesticClientType.D3
    else if (annualEnergyConsumption < 15_000) return DomesticClientType.D4
    else return DomesticClientType.D5
  }
}
