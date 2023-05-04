import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IDevice} from "../../models/device.model";

@Component({
  selector: 'app-select-device',
  templateUrl: './select-device.component.html',
  styleUrls: ['./select-device.component.css']
})
export class SelectDeviceComponent {
  @Input('devices') devices!: IDevice[];
  @Output('deviceSelect') deviceSelect: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onSelectDevice(uuid: string) {
    this.deviceSelect.emit(uuid);
  }
}
