import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eco-calculator';
  deviceData: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.deviceData = this.formBuilder.group({
      deviceType: ['', [Validators.required]],
      power: [0, [Validators.required]],
      energyClass: ['', [Validators.required]],
      usage: ['', [Validators.required]],
      warranty: ['', [Validators.required]]
    });
  }

  calculateFootprint() {
    console.log(this.deviceData);
  }
}
