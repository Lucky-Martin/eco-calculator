import {Component, OnInit} from '@angular/core';
import {DeviceService} from "../services/device.service";
import {IDevice, IDevices} from '../models/device.model';

interface IDataItem {
  criteria: string;
  firstDeviceValue: string;
  secondDeviceValue: string;
  objectKey: string;
}

@Component({
  selector: 'app-compare-devices',
  templateUrl: './compare-devices.component.html',
  styleUrls: ['./compare-devices.component.css']
})
export class CompareDevicesComponent implements OnInit {
  devicesToChoose!: IDevice[];
  dataSource!: IDataItem[];
  firstDevice!: IDevice | null;
  secondDevice!: IDevice | null;
  firstDeviceHighlight!: string[] | null;
  secondDeviceHighlight!: string[] | null;
  showDifferences = false;
  reset = false;
  displayedColumns: string[] = [];
  private readonly allDevices: IDevices;

  constructor(private deviceService: DeviceService) {
    this.allDevices = deviceService.fetchDevices();
  }

  ngOnInit(): void {
    this.devicesToChoose = this.allDevices;

    const device = JSON.parse(sessionStorage.getItem('compare-device')!);
    if (device) this.firstDevice = device;

    if (this.firstDevice)
      this.filterDevices(this.firstDevice)

  }

  onSelectDevice(uuid: string, deviceCount: number) {
    if (deviceCount === 1) {
      this.firstDevice = this.deviceService.getDevice(uuid)!;

      this.filterDevices(this.firstDevice);
    } else if (deviceCount === 2) {
      this.secondDevice = this.deviceService.getDevice(uuid)!;

      this.filterDevices(this.secondDevice);
    }

    const diff = this.deviceService.compareDevice(this.firstDevice!, this.secondDevice!);
    if (diff) {
      this.firstDeviceHighlight = diff.betterInFirstDevice;
      this.secondDeviceHighlight = diff.betterInSecondDevice;

      const firstFootprint = this.firstDevice!.carbonFootprint;
      const secondFootprint = this.secondDevice!.carbonFootprint;
      this.dataSource = [
        {criteria: 'Консумация на електроенергия за периода', firstDeviceValue: `${firstFootprint.electricityConsummationPerMonth} кВч`, secondDeviceValue: `${secondFootprint.electricityConsummationPerMonth} кВч`, objectKey: 'electricityConsummationPerMonth'},
        {criteria: 'Разход за ел. енергия на периода', firstDeviceValue: `${firstFootprint.electricityDeviceCostForMonth} лв`, secondDeviceValue: `${secondFootprint.electricityDeviceCostForMonth} лв`, objectKey: 'electricityDeviceCostForMonth'},
        {criteria: 'Разход на ел. енергия за целия живот на стоката', firstDeviceValue: `${firstFootprint.electricityDeviceConsumptionForLifetime} кВч`, secondDeviceValue: `${secondFootprint.electricityDeviceConsumptionForLifetime} кВч`, objectKey: 'electricityDeviceConsumptionForLifetime'},
        {criteria: 'Разход за ел. енергия за целия живот на стоката', firstDeviceValue: `${firstFootprint.electricityDeviceCostForLifetime} лв`, secondDeviceValue: `${secondFootprint.electricityDeviceCostForLifetime} лв`, objectKey: 'electricityDeviceCostForLifetime'},
        {criteria: 'Въглероден отпечатък на ползване', firstDeviceValue: `${firstFootprint.carbonFootprint} C02/кВч`, secondDeviceValue: `${secondFootprint.carbonFootprint} C02/кВч`, objectKey: 'carbonFootprint'},
        {criteria: 'Енергийна ефективност', firstDeviceValue: firstFootprint.energyEfficiency, secondDeviceValue: secondFootprint.energyEfficiency, objectKey: 'energyEfficiency'}
      ];

      this.displayedColumns = ['criteria', this.firstDevice!.name, this.secondDevice!.name]

      this.showDifferences = true;
    }
  }

  private filterDevices(selectedDevice: IDevice){
    this.devicesToChoose = this.allDevices.filter(device => {
      return device.typeOfDevice === selectedDevice!.typeOfDevice && device.uuid !== selectedDevice.uuid
    });
  }

  clearDevices() {
    this.showDifferences = false;
    this.firstDevice = null;
    this.firstDeviceHighlight = null;
    this.secondDevice = null;
    this.secondDeviceHighlight = null;
    this.reset = true;
    this.devicesToChoose = this.allDevices;

    setTimeout(() => {
      this.reset = false;
    }, 1);
  }
}
