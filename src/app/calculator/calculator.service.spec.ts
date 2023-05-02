import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import type { INewDevice } from "../models/device.model";

describe('CalculatorService', () => {
  let service: CalculatorService;
  let emittedValue!: number;
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
    service.setDevice(baseDevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate energy consumption', () => {
    service.electricityConsummationPerMonth.subscribe((value) => emittedValue = value);
    service.calculateElectricityConsummationPerMonth();
    expect(emittedValue).toEqual(78)
  });

  it('should calculate electricity device cost for month', () => {
    service.electricityDeviceCostForMonth.subscribe((value) => emittedValue = value);
    service.calculateElectricityDeviceCostForMonth();
    expect(emittedValue).toEqual(17.706)
  });

  it('should calculate electricity device consumption for lifetime', () => {
    service.electricityDeviceConsumptionForLifetime.subscribe((value) => emittedValue = value);
    service.calculateElectricityDeviceConsumptionForLifetime();
    expect(emittedValue).toEqual(1872)
  });

  it('should calculate electricity consumption for the lifetime of the device', () => {
    service.electricityDeviceCostForLifetime.subscribe((value) => emittedValue = value);
    service.calculateElectricityDeviceCostForLifetime();
    expect(emittedValue).toEqual(424.944)
  });
});
