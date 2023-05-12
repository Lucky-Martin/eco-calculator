import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {IDeviceFootprintData} from "../../../models/device.model";

@Component({
  selector: 'app-device-score',
  templateUrl: './device-score.component.html',
  styleUrls: ['./device-score.component.css']
})
export class DeviceScoreComponent implements OnInit, OnChanges {
  @Input('carbonFootprint') footprint!: IDeviceFootprintData;
  displayedColumns: string[] = ['criteria', 'value'];
  dataSource!: {}[];
  constructor() { }

  ngOnInit(): void {
    this.calculateDataSource();
  }

  ngOnChanges() {
    this.calculateDataSource();
  }

  private calculateDataSource() {
    if (this.footprint) {
      this.dataSource = [
        {criteria: 'Консумация на електроенергия за месец', value: `${this.footprint.electricityConsummationPerMonth} кВч`},
        {criteria: 'Разход за ел. енергия на месец', value: `${this.footprint.electricityDeviceCostForMonth} лв`},
        {criteria: 'Разход на ел. енергия за целия живот на стоката', value: `${this.footprint.electricityDeviceConsumptionForLifetime} кВч`},
        {criteria: 'Разход за ел. енергия за целия живот на стоката ', value: `${this.footprint.electricityDeviceCostForLifetime} лв`},
        {criteria: 'Въглероден отпечатък на ползване', value: `${Math.round(this.footprint.carbonFootprint)} C02/кВч`},
        {criteria: 'Енергийна ефективност', value: this.footprint.energyEfficiency}
      ]
    }
  }
}
