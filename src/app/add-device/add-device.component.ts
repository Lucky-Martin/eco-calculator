import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  deviceData: FormGroup;
  deviceUsage: number = 0;

  constructor(private formBuilder: FormBuilder) {
    this.deviceData = this.formBuilder.group({
      deviceType: ['', [Validators.required]],
      power: [0, [Validators.required]],
      energyClass: ['', [Validators.required]],
      warranty: ['', [Validators.required]]
    });
  }

  calculateFootprint() {
    const deviceType = this.deviceData.get('deviceType')!.value;
    const power = this.deviceData.get('deviceType')!.value;
    const energyClass = this.deviceData.get('deviceType')!.value;
    const warranty = this.deviceData.get('deviceType')!.value;
  }

  ngOnInit(): void {
  }

}
