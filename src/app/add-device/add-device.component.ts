import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device, IDevice, IDeviceFootprintData } from "../models/device.model";
import {CalculatorService} from "../services/calculator.service";
import {DeviceService} from "../services/device.service";
import {MatStepper} from "@angular/material/stepper";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  deviceData: FormGroup;
  deviceFootprint!: IDeviceFootprintData;
  deviceUsage!: number;
  sessionLoaded: boolean = false;
  private device!: IDevice;
  private deviceUUID!: string;

  constructor(private formBuilder: FormBuilder,
              private calculatorService: CalculatorService,
              private deviceService: DeviceService,
              private router: Router) {
    this.deviceData = this.formBuilder.group({
      name: ['', [Validators.required]],
      deviceType: ['', [Validators.required]],
      power: [null, [Validators.required]],
      energyClass: ['', [Validators.required]],
      warranty: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    const deviceDataJSON = sessionStorage.getItem('add-device');
    if (deviceDataJSON) {
      const {uuid, name, typeOfDevice, power, energyClass, warrantyInMonths, workingHours} = JSON.parse(deviceDataJSON);
      this.deviceUUID = uuid;
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
      uuid: this.deviceUUID,
      carbonFootprint: this.deviceFootprint,
      typeOfDevice: deviceType,
      warrantyInMonths: warranty,
      workingHours: this.deviceUsage
    };

    if (this.sessionLoaded) {
      this.deviceService.updateDevice(device);
    } else {
      this.deviceService.addDevice(device);
    }

    this.deviceData.reset();
    this.stepper.reset();
    await this.router.navigateByUrl('list');
  }

  calculateFootprint() {
    const {name, deviceType, power, energyClass, warranty} = this.getInputData();
    this.device = new Device({
      energyClass, name, power,
      typeOfDevice: deviceType,
      warrantyInMonths: warranty,
      workingHours: this.deviceUsage
    });
    this.deviceFootprint = this.device.carbonFootprint;
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
