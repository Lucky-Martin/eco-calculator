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
}
