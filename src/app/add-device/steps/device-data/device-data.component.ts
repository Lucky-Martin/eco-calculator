import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {map, Observable, startWith, Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ScanEnergyLabelQrComponent} from "./dialogs/scan-energy-label-qr/scan-energy-label-qr.component";
import {EprelService} from "./eprel.service";
import {getDeviceTypeInLocalLanguage} from "../../../functions/getDeviceTypeInLocalLanguage";
import {DeviceTypes, TDeviceType} from "../../../models/device.model";

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.css']
})
export class DeviceDataComponent implements OnInit, OnDestroy {
  @Input('deviceData') deviceData!: FormGroup;
  filteredOptions!: Observable<string[]>;

  eprelResultSubscription: Subscription;

  constructor(private dialog: MatDialog,
              private eprelService: EprelService) {
    this.eprelResultSubscription = eprelService.eprelResult.subscribe({
      next: (data) => {
        this.dialog.closeAll();
        this.deviceData.setValue({
          name: '',
          deviceType: getDeviceTypeInLocalLanguage(data.deviceType),
          power: data.power,
          energyClass: data.energyClass,
          warranty: data.warranty ?? null
        })
      },
      error: (err) => console.log(err)
    })
  }

  ngOnInit(): void {
    this.filteredOptions = this.deviceData.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  ngOnDestroy(): void {
    this.eprelResultSubscription.unsubscribe()
  }

  startScan() {
    this.dialog.open(ScanEnergyLabelQrComponent, {
      height: '70%',
      width: '95%',
      maxWidth: 512,
      maxHeight: 512
    });
  }

  private _filter(value: { deviceType: string }): string[] {
    if (value) {
      const filterValue = value.deviceType.toLowerCase();
      return this.DeviceTypes.filter(option => getDeviceTypeInLocalLanguage(option).toLowerCase().includes(filterValue));
    } else {
      return this.DeviceTypes;
    }
  }

  enToBg(value: string) {return getDeviceTypeInLocalLanguage(value as TDeviceType)}
  protected readonly DeviceTypes = DeviceTypes;
}
