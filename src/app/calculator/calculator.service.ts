import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  devices: any[] = [];

  electricityConsummationPerMonth = new Subject<any>();
  electricityPricePerMonth = new Subject<any>();
  electricityDeviceCostForLifetime = new Subject<any>();
  carbonFootprint = new Subject<any>();
  energyEfficiency = new Subject<any>();

  constructor() { }

  addDevice(newDevice: any){
    this.devices.push(newDevice);
  }

  calculateEverything() {
    this.calculateElectricityConsummationPerMonth();
    this.calculateElectricityPricePerMonth();
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
