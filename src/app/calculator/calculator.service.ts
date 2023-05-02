import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Device } from "../../models/device.model";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private device!: Device;

  electricityConsummationPerMonth = new Subject<any>();
  electricityPricePerMonth = new Subject<any>();
  electricityDeviceCostForLifetime = new Subject<any>();
  carbonFootprint = new Subject<any>();
  energyEfficiency = new Subject<any>();

  constructor() { }

  setDevice(newDevice: Device){
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
    this.electricityConsummationPerMonth.next(1);
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
}