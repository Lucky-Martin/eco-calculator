import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import type { IDevice } from "../../models/device.model";

describe('CalculatorService', () => {
  let service: CalculatorService;
  const baseDevice: IDevice = {
    power: 5,
    hoursPerMonth: 20,
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
});
