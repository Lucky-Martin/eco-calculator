import {TDeviceType, TEnergyClass} from "../../../models/device.model";

export interface DeviceDataModel{
  // name: string;
  deviceType: TDeviceType;
  power: number;
  energyClass: TEnergyClass;
  warranty?: number;
}
