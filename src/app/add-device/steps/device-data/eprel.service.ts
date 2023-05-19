import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {DeviceDataModel} from "./deviceData.model";

const regex = new RegExp("(https:\\/\\/eprel\\.ec\\.europa\\.eu\\/qr\\/)(?<eprelCode>\\d+)");

@Injectable({
  providedIn: 'root'
})
export class EprelService {

  private _isFetching = false;

  eprelResult = new Subject<DeviceDataModel>();
  isFetchSuccess = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getProductModel(scanResult: string) {
    const eprelProductCode = this._getEprelCode(scanResult);

    if (regex.test(scanResult)) {
      this._isFetching = true;
      this.isFetchSuccess.next(this._isFetching);
      this.http.get<any>(`https://eprel.ec.europa.eu/api/product/${eprelProductCode}`).subscribe({
        next: (result) => {
          const deviceDataResult: DeviceDataModel = {
            deviceType: result.productGroup,
            power: this._calculatePower(result),
            energyClass: result.energyClass,
            warranty: result.guaranteeDuration
          }
          this.eprelResult.next(deviceDataResult)
        },
        error: (err) => {
          this.eprelResult.error(err);
          this._isFetching = false;
          this.isFetchSuccess.next(this._isFetching);
        },
        complete: () => {
          this._isFetching = false;
          this.isFetchSuccess.next(this._isFetching);
        }
      });
    }
  }

  private _calculatePower(result: any) {
    switch (result.productGroup) {
      case "dishwashers2019":
        return Number((result.energyCons / (result.programmeDuration / 60)).toFixed(3));

      case "washingmachines2019":
        return Number((result.energyConsPerCycle / (result.programmeDurationRated / 60)).toFixed(3));

      case "washerdriers2019":
        return Number((result.energyConsumptionWashAndDry / (result.programDurationRatedWashAndDry / 60)).toFixed(3));

      case "electronicdisplays":
        return Number((result.powerOnModeSDR / 1_000).toFixed(3));

      case "refrigeratingappliances2019":
        return Number((result.energyConsAnnualV2 / (365 * 24)).toFixed(3));

      case "lightsources":
        return Number((result.energyConsOnMode / 1_000).toFixed(3));

      case "airconditioners":
        return Number((result.coolingCharacteristics.annualElectricityConsumption / (365 * 24)).toFixed(3));

      case "ovens":
        const averageConsumption = result.cavities.reduce((acc: number, current: any) =>
          acc + (current.energyConsumptionCycle ?? 0) + (current.energyConsumptionCycleFanForcedGas ?? 0) + (current.energyConsumptionCycleFanForced ?? 0)
        ) / result.numberCavities;
        return Number(averageConsumption.toFixed(3));

      case "rangehoods":
        return Number((result.energyAnnual / (365 * 24)).toFixed(3));

      case "waterheaters":
        return Number((result.loadProfiles[0].waterHeatingAnnualElectricityCons).toFixed(3))

      default:
        return 0;
    }
  }

  private _getEprelCode(eprelUrl: string) {
    return regex.exec(eprelUrl)?.groups!['eprelCode'] ?? '';
  }
}
