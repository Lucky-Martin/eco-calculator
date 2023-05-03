import {Component, Input, OnInit} from '@angular/core';
import {IDeviceFootprintData} from "../../../models/device.model";

@Component({
  selector: 'app-device-score',
  templateUrl: './device-score.component.html',
  styleUrls: ['./device-score.component.css']
})
export class DeviceScoreComponent implements OnInit {
  @Input('carbonFootprint') footprint!: IDeviceFootprintData;
  displayedColumns: string[] = ['criteria', 'value'];
  dataSource!: {}[];
  constructor() { }

  ngOnInit(): void {
    if (this.footprint) {
      this.dataSource = [
        {criteria: 'Консумация на електроенергия на месец', value: this.footprint.electricityConsummationPerMonth},
        {criteria: 'Разход за ел. енергия на месец', value: this.footprint.electricityDeviceCostForMonth},
        {criteria: 'Разход на ел. енергия за целия живот на стоката', value: this.footprint.electricityDeviceConsumptionForLifetime},
        {criteria: 'Разход за ел. енергия за целия живот на стоката ', value: this.footprint.electricityDeviceCostForLifetime},
        {criteria: 'Въглероден отпечатък на ползване', value: this.footprint.carbonFootprint},
        {criteria: 'Енергийна ефективност', value: this.footprint.energyEfficiency}
      ]
    }
  }

}
