import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IDevice, IDevices} from "../../models/device.model";

@Component({
  selector: 'app-select-device',
  templateUrl: './select-device.component.html',
  styleUrls: ['./select-device.component.css']
})
export class SelectDeviceComponent {
  @Input('devices') devicesToChoose!: IDevices;
  @Input('device') device!: IDevice;
  @Output('deviceSelect') deviceSelect = new EventEmitter<string>();

  constructor() { }

  onSelectDevice(uuid: string) {
    this.deviceSelect.emit(uuid);
  }
}
