import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { INewDevice } from "../models/device.model";
import { DomesticClientType } from "../models/domesticClients.model";
import { StatisticData } from "../models/statistics";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private device!: INewDevice;
  electricityConsummationPerMonth = new Subject<number>();
  electricityDeviceCostForMonth = new Subject<number>();
  electricityDeviceConsumptionForLifetime = new Subject<number>();
  electricityDeviceCostForLifetime = new Subject<number>();
  carbonFootprint = new Subject<number>();
  energyEfficiency = new Subject<number>();

  constructor() { }

  setDevice(newDevice: INewDevice){
    this.device = newDevice;
    console.log(this.device)
  }

  calculateEverything() {
    this.calculateElectricityConsummationPerMonth();
    this.calculateElectricityDeviceCostForMonth();
    this.calculateElectricityDeviceCostForLifetime();
    this.calculateCarbonFootprint();
    this.calculateEnergyEfficiency();
  }

  calculateElectricityConsummationPerMonth() {

    const energyConsumption = this.device.workingHours * this.device.power;
    console.log(this.device)
    this.electricityConsummationPerMonth.next(energyConsumption);
    return energyConsumption;
  }

  calculateElectricityDeviceCostForMonth() {
    const monthlyEnergyConsumption = this.device.workingHours * this.device.power;
    const annualEnergyConsumption = this.device.power * this.device.workingHours * 12;
    const monthlyEnergyConsumptionPerMonth = monthlyEnergyConsumption * this.domesticClientType(annualEnergyConsumption);

    this.electricityDeviceCostForMonth.next(monthlyEnergyConsumptionPerMonth);
    return monthlyEnergyConsumptionPerMonth;
  }

  calculateElectricityDeviceConsumptionForLifetime() {
    const lifetimeEnergyConsumption = this.device.power * this.device.workingHours * this.device.warrantyInMonths;
    this.electricityDeviceConsumptionForLifetime.next(lifetimeEnergyConsumption);
    return lifetimeEnergyConsumption;
  }
  calculateElectricityDeviceCostForLifetime() {
    const annualEnergyConsumption = this.device.power * this.device.workingHours * 12;
    const lifetimeEnergyConsumption = this.device.power * this.device.workingHours * this.device.warrantyInMonths;
    const lifetimeEnergyConsumptionConst = lifetimeEnergyConsumption * this.domesticClientType(annualEnergyConsumption);

    this.electricityDeviceCostForLifetime.next(lifetimeEnergyConsumptionConst);
    return lifetimeEnergyConsumptionConst;
  }

  /**
   * @returns the carbon footprint for the device lifetime in kilograms
   * */
  calculateCarbonFootprint() {
    const lifetimeEnergyConsumption = this.device.power * this.device.workingHours * this.device.warrantyInMonths;
    const lifetimeCarbonFootprintKG = (lifetimeEnergyConsumption * StatisticData.GramsOfCarbonEmissionsPerkWh2021) / 1000
    this.carbonFootprint.next(lifetimeCarbonFootprintKG);
    return lifetimeCarbonFootprintKG;
  }

  calculateEnergyEfficiency() {
    this.energyEfficiency.next(1);
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
