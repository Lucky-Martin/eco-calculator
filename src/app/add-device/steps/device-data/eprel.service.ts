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
      this.http.get<any>(`/api/product/${eprelProductCode}`).subscribe({
        next: (result) => {
          const deviceDataResult: DeviceDataModel = {
            deviceType: result.productGroup,
            power: result.energyConsOnMode,
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

  private _getEprelCode(eprelUrl: string) {
    return regex.exec(eprelUrl)?.groups!['eprelCode'] ?? '';
  }
}
