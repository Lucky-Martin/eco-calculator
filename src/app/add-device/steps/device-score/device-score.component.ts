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
        {criteria: 'Консумация на електроенергия за месец', value: `${this.footprint.electricityConsummationPerMonth} кВч`, tip: 'Консумацията на електричество за един месец е общото количество енергия, изразходвано от потребителя през този период.'},
        {criteria: 'Разход за ел. енергия на месец', value: `${this.footprint.electricityDeviceCostForMonth} лв`, tip: 'Разход за ел. енергия на месец е общото количество електричество, което се изразходва от домакинството или бизнеса през този период.'},
        {criteria: 'Разход на ел. енергия за целия живот на стоката', value: `${this.footprint.electricityDeviceConsumptionForLifetime} кВч`, tip: 'Разход на ел. енергия за целия живот на стоката е общото количество енергия, което се изразходва от производството, употребата и изхвърлянето му.'},
        {criteria: 'Разход за ел. енергия за целия живот на стоката', value: `${this.footprint.electricityDeviceCostForLifetime} лв`, tip: 'Разход за ел. енергия за целия живот на стоката е цената за общото количество енергия, което се изразходва от производството, употребата и изхвърлянето му.'},
        {criteria: 'Въглероден отпечатък на ползване', value: `${Math.round(this.footprint.carbonFootprint)} C02/кВч`, tip: 'Въглеродният отпечатък на потреблението е мярка за общото количество парникови газове, излъчени от едно действие, продукт или услуга.'},
        {criteria: 'Енергийна ефективност', value: this.footprint.energyEfficiency, tip: 'Енергийната ефективност е способността да се използва по-малко енергия за постигане на същия резултат.'}
      ]
    }
  }
}
