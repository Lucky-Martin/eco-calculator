import {Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IDeviceFootprintData} from "../models/device.model";
import {CalculatorService} from "../services/calculator.service";
import {DeviceService} from "../services/device.service";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent {
  deviceData: FormGroup;
  deviceUsage: number = 0;
  deviceFootprint!: IDeviceFootprintData;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private formBuilder: FormBuilder,
              private calculatorService: CalculatorService,
              private deviceService: DeviceService) {
    this.deviceData = this.formBuilder.group({
      name: ['', [Validators.required]],
      deviceType: ['', [Validators.required]],
      power: [0, [Validators.required]],
      energyClass: ['', [Validators.required]],
      warranty: [0, [Validators.required]]
    });
  }

  saveDevice() {
    let {name, power, energyClass, deviceType, warranty} = this.getInputData();

    this.deviceService.addDevice({
      energyClass, name, power,
      typeOfDevice: deviceType,
      warrantyInMonths: warranty,
      workingHours: this.deviceUsage
    });

    this.deviceData.reset();
    this.stepper.reset();
  }

  private getInputData() {
    const name = this.deviceData.get('name')!.value;
    const deviceType = this.deviceData.get('deviceType')!.value;
    const power = this.deviceData.get('power')!.value;
    const energyClass = this.deviceData.get('energyClass')!.value;
    const warranty = this.deviceData.get('warranty')!.value;

    return {name, deviceType, power, energyClass, warranty};
  }
}
