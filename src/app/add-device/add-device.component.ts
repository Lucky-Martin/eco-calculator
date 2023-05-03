import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IDeviceFootprintData} from "../models/device.model";
import {CalculatorService} from "../calculator/calculator.service";

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent {
  deviceData: FormGroup;
  deviceUsage: number = 0;
  deviceFootprint!: IDeviceFootprintData;

  constructor(private formBuilder: FormBuilder,
              private calculatorService: CalculatorService) {
    this.deviceData = this.formBuilder.group({
      name: ['', [Validators.required]],
      deviceType: ['', [Validators.required]],
      power: [0, [Validators.required]],
      energyClass: ['', [Validators.required]],
      warranty: [0, [Validators.required]]
    });
  }

  calculateFootprint() {
    const name = this.deviceData.get('name')!.value;
    const deviceType = this.deviceData.get('deviceType')!.value;
    const power = this.deviceData.get('power')!.value;
    const energyClass = this.deviceData.get('energyClass')!.value;
    const warranty = this.deviceData.get('warranty')!.value;

    console.log(this.deviceUsage);

    this.calculatorService.setDevice({
      energyClass, name, power,
      typeOfDevice: deviceType,
      warrantyInMonths: warranty,
      workingHours: this.deviceUsage
    });

    this.deviceFootprint = {
      carbonFootprint: this.calculatorService.calculateCarbonFootprint(),
      electricityConsummationPerMonth: this.calculatorService.calculateElectricityConsummationPerMonth(),
      electricityDeviceConsumptionForLifetime: this.calculatorService.calculateElectricityDeviceConsumptionForLifetime(),
      electricityDeviceCostForLifetime: this.calculatorService.calculateElectricityDeviceCostForLifetime(),
      electricityDeviceCostForMonth: this.calculatorService.calculateElectricityDeviceCostForMonth(),
      energyEfficiency: this.calculatorService.calculateEnergyEfficiency()
    }

    console.log(this.deviceFootprint);
  }
}
