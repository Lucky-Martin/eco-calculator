import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.css']
})
export class DeviceDataComponent implements OnInit {
  @Input('deviceData') deviceData!: FormGroup;
  filteredOptions!: Observable<string[]>;
  options: string[] = ['Хладилник', 'Печка', 'Климатик', 'Микровълнова', 'Пералня', 'Сушилня', 'Съдомиялна', 'Компютър', 'Принтер', 'Бойлер'];

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.deviceData.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: { deviceType: string }): string[] {
    if (value) {
      const filterValue = value.deviceType.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    } else {
      return this.options;
    }
  }
}
