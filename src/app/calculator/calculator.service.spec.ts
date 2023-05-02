import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import type { INewDevice } from "../models/device.model";

describe('CalculatorService', () => {
  let service: CalculatorService;
  const baseDevice: INewDevice = {
    power: 0.13,
    hoursPerMonth: 600,
    energyClass: "APP",
    typeOfDevice: "refrigerator",
    warrantyInMonths: 24
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate energy consumption', () => {
    let emittedValue!: number;
    service.electricityConsummationPerMonth.subscribe((value) => emittedValue = value);
    service.setDevice(baseDevice);
    service.calculateElectricityConsummationPerMonth();
    expect(emittedValue).toEqual(100)
  });
});
