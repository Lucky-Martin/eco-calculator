import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { INewDevice } from "../models/device.model";
import { DomesticClientType } from "../models/domesticClients.model";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private device!: INewDevice;

  electricityConsummationPerMonth = new Subject<number>();
  electricityDeviceCostForMonth = new Subject<number>();
  electricityDeviceCostForLifetime = new Subject<number>();
  carbonFootprint = new Subject<number>();
  energyEfficiency = new Subject<number>();

  constructor() { }

  setDevice(newDevice: INewDevice){
    this.device = newDevice;
  }

  calculateEverything() {
    this.calculateElectricityConsummationPerMonth();
    this.calculateElectricityDeviceCostForMonth();
    this.calculateElectricityDeviceCostForLifetime();
    this.calculateCarbonFootprint();
    this.calculateEnergyEfficiency();
  }

  calculateElectricityConsummationPerMonth() {
    const energyConsumption = this.device.hoursPerMonth * this.device.power;
    this.electricityConsummationPerMonth.next(energyConsumption);
  }

  calculateElectricityDeviceCostForMonth() {
    const monthlyEnergyConsumption = this.device.hoursPerMonth * this.device.power;
    const annualEnergyConsumption = this.device.power * this.device.hoursPerMonth * 12;
    const monthlyEnergyConsumptionPerMonth = monthlyEnergyConsumption * this.domesticClientType(annualEnergyConsumption);

    this.electricityDeviceCostForMonth.next(monthlyEnergyConsumptionPerMonth);
  }

  calculateElectricityDeviceCostForLifetime() {
    const annualEnergyConsumption = this.device.power * this.device.hoursPerMonth * 12;
    const lifetimeEnergyConsumption = this.device.power * this.device.hoursPerMonth * this.device.warrantyInMonths;
    const lifetimeEnergyConsumptionConst = lifetimeEnergyConsumption * this.domesticClientType(annualEnergyConsumption);

    this.electricityDeviceCostForLifetime.next(lifetimeEnergyConsumptionConst);
  }

  calculateCarbonFootprint() {
    this.carbonFootprint.next(1);
  }

  calculateEnergyEfficiency() {
    this.energyEfficiency.next(1);
  }

  private domesticClientType(annualEnergyConsumption: number): DomesticClientType {
    if (annualEnergyConsumption < 1_000) return DomesticClientType.D1
    else if (annualEnergyConsumption < 2_500) return DomesticClientType.D2
    else if (annualEnergyConsumption < 5_000) return DomesticClientType.D3
    else if (annualEnergyConsumption < 15_000) return DomesticClientType.D4
    else return DomesticClientType.D5
  }
}
