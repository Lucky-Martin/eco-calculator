import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDevice} from "../../models/device.model";

@Component({
  selector: 'app-select-device',
  templateUrl: './select-device.component.html',
  styleUrls: ['./select-device.component.css']
})
export class SelectDeviceComponent implements OnInit {
  @Input('devices') devices!: IDevice[];
  @Output('deviceSelect') deviceSelect: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelectDevice(uuid: string) {
    this.deviceSelect.emit(uuid);
  }
}
