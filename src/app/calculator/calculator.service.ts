import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { IDevice } from "../models/device.model";
import { DomesticClientType } from "../models/domesticClients.model";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private device!: IDevice;

  electricityConsummationPerMonth = new Subject<number>();
  electricityPricePerMonth = new Subject<number>();
  electricityDeviceCostForLifetime = new Subject<number>();
  carbonFootprint = new Subject<number>();
  energyEfficiency = new Subject<number>();

  constructor() { }

  setDevice(newDevice: IDevice){
    this.device = newDevice;
  }

  calculateEverything() {
    this.calculateElectricityConsummationPerMonth();
    this.calculateElectricityPricePerMonth();
    this.calculateElectricityDeviceCostForLifetime();
    this.calculateCarbonFootprint();
    this.calculateEnergyEfficiency();
  }

  calculateElectricityConsummationPerMonth() {
    const energyConsumption = this.device.hoursPerMonth * this.device.power;
    this.electricityConsummationPerMonth.next(energyConsumption);
  }

  calculateElectricityPricePerMonth() {
    this.electricityPricePerMonth.next(1);
  }

  calculateElectricityDeviceCostForLifetime() {
    this.electricityDeviceCostForLifetime.next(1);

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
