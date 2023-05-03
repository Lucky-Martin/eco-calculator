import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IDeviceFootprintData} from "../models/device.model";
import {CalculatorService} from "../services/calculator.service";
import {DeviceService} from "../services/device.service";
import {MatStepper} from "@angular/material/stepper";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  deviceData: FormGroup;
  deviceFootprint!: IDeviceFootprintData;
  deviceUsage: number = 0;
  sessionLoaded: boolean = false;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private formBuilder: FormBuilder,
              private calculatorService: CalculatorService,
              private deviceService: DeviceService,
              private router: Router) {
    this.deviceData = this.formBuilder.group({
      name: ['', [Validators.required]],
      deviceType: ['', [Validators.required]],
      power: [0, [Validators.required]],
      energyClass: ['', [Validators.required]],
      warranty: [0, [Validators.required]]
    });
  }

  ngOnInit() {
    const deviceDataJSON = sessionStorage.getItem('add-device');
    if (deviceDataJSON) {
      const {name, typeOfDevice, power, energyClass, warrantyInMonths, workingHours} = JSON.parse(deviceDataJSON);
      this.deviceData.setValue({
        name, power, energyClass,
        deviceType: typeOfDevice,
        warranty: warrantyInMonths,
      });
      this.deviceUsage = workingHours;
      this.sessionLoaded = true;
    }
  }

  async saveDevice() {
    let {name, power, energyClass, deviceType, warranty} = this.getInputData();
    const device = {
      energyClass, name, power,
      typeOfDevice: deviceType,
      warrantyInMonths: warranty,
      workingHours: this.deviceUsage
    };

    if (this.sessionLoaded) {
      // TODO: Add update for device
    } else {
      this.deviceService.addDevice(device);
    }

    this.deviceData.reset();
    this.stepper.reset();
    await this.router.navigateByUrl('list');
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
