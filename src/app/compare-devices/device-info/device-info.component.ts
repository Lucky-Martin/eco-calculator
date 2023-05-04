import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {IDevice} from "../../models/device.model";
import {getDeviceTypeInLocalLanguage} from "../../functions/getDeviceTypeInLocalLanguage";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";

interface IDeviceNode {
  name: string;
  highlight: boolean;
  children?: IDeviceNode[];
}
interface IDeviceFlatNode {
  expandable: boolean;
  name: string;
  highlight: boolean;
  level: number;
}

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.css']
})
export class DeviceInfoComponent implements OnInit, OnChanges {
  @Input('device') device!: IDevice;
  @Input('highlightFields') highlightFields!: string[];
  treeControl!: FlatTreeControl<any>;
  treeFlattener!: MatTreeFlattener<any, any>;
  dataSource!: MatTreeFlatDataSource<any, any>;
  hasChild!: (_: number, node: IDeviceFlatNode) => boolean;
  private transformer!: (node: IDeviceNode, level: number) => IDeviceFlatNode;

  constructor() { }

  ngOnInit(): void {
    if (this.device) {
      this.createTreeData();
    }
  }

  ngOnChanges() {
    if (this.device) {
      this.createTreeData();
    }
  }

  private createTreeData() {
    this.transformer = (node: IDeviceNode, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        highlight: node.highlight,
        level: level,
      };
    };

    this.treeControl = new FlatTreeControl<IDeviceFlatNode>(
      node => node.level,
      node => node.expandable,
    );

    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      node => node.level,
      node => node.expandable,
      node => node.children,
    );

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.hasChild = (_: number, node: IDeviceFlatNode) => node.expandable;

    if (this.highlightFields) {
      this.dataSource.data = [
      {
        name: 'Характеристика на уреда',
        children: [
          {name: `Име на уреда - ${this.device.name}`},
          {name: `Вид на устройството - ${getDeviceTypeInLocalLanguage(this.device.typeOfDevice)}`},
          {name: `Мощност ${this.device.power} кВч`, highlight: this.highlightFields.includes('power')},
          {name: `Енгергиен клас ${this.device.energyClass}`, highlight: this.highlightFields.includes('energyClass')},
          {name: `Гаранция ${this.device.warrantyInMonths} месеца`, highlight: this.highlightFields.includes('warrantyInMonths')},
        ],
      },
      {
        name: 'Разход на енергия и отпечатък',
        children: [
          {name: `Консумация на електроенергия за периода ${this.device.carbonFootprint.electricityConsummationPerMonth} кВч`, highlight: this.highlightFields.includes('electricityConsummationPerMonth')},
          {name: `Разход за ел. енергия на периода ${this.device.carbonFootprint.electricityDeviceCostForMonth} лв`, highlight: this.highlightFields.includes('electricityDeviceCostForMonth')},
          {name: `Разход на ел. енергия за целия живот на стоката ${this.device.carbonFootprint.electricityDeviceConsumptionForLifetime} кВч`, highlight: this.highlightFields.includes('electricityDeviceConsumptionForLifetime')},
          {name: `Разход за ел. енергия за целия живот на стоката ${this.device.carbonFootprint.electricityDeviceCostForLifetime} лв`, highlight: this.highlightFields.includes('electricityDeviceCostForLifetime')},
          {name: `Въглероден отпечатък на ползване ${this.device.carbonFootprint.carbonFootprint} C02/кВч`, highlight: this.highlightFields.includes('carbonFootprint')},
          {name: `Енергийна ефективност ${this.device.energyClass}`, highlight: this.highlightFields.includes('energyClass')},
        ]
      }
    ];
    } else {
      this.dataSource.data = [
      {
        name: 'Характеристика на уреда',
        children: [
          {name: `Име на уреда - ${this.device.name}`},
          {name: `Вид на устройството - ${getDeviceTypeInLocalLanguage(this.device.typeOfDevice)}`},
          {name: `Мощност ${this.device.power} кВч`},
          {name: `Енгергиен клас ${this.device.energyClass}`},
          {name: `Гаранция ${this.device.warrantyInMonths} месеца`},
        ],
      },
      {
        name: 'Разход на енергия и отпечатък',
        children: [
          {name: `Консумация на електроенергия за периода ${this.device.carbonFootprint.electricityConsummationPerMonth} кВч`},
          {name: `Разход за ел. енергия на периода ${this.device.carbonFootprint.electricityDeviceCostForMonth} лв`},
          {name: `Разход на ел. енергия за целия живот на стоката ${this.device.carbonFootprint.electricityDeviceConsumptionForLifetime} кВч`},
          {name: `Разход за ел. енергия за целия живот на стоката ${this.device.carbonFootprint.electricityDeviceCostForLifetime} лв`},
          {name: `Въглероден отпечатък на ползване ${this.device.carbonFootprint.carbonFootprint} C02/кВч`},
          {name: `Енергийна ефективност ${this.device.energyClass}`},
        ]
      }
    ];
    }
  }
}
