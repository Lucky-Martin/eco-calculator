import {Component, Input, OnInit} from '@angular/core';
import {EnergyClass} from "../../models/device.model";

@Component({
  selector: 'app-energy-class-color',
  templateUrl: './energy-class-color.component.html',
  styleUrls: ['./energy-class-color.component.css']
})
export class EnergyClassColorComponent implements OnInit {
  @Input("energyClass") energyClass!: string;
  @Input('showLabel') showLabel!: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}
