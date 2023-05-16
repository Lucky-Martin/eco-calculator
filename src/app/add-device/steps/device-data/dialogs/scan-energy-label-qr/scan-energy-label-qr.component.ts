import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {EprelService} from "../../eprel.service";

@Component({
  selector: 'app-scan-energy-label-qr',
  templateUrl: './scan-energy-label-qr.component.html',
  styleUrls: ['./scan-energy-label-qr.component.css']
})
export class ScanEnergyLabelQrComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ScanEnergyLabelQrComponent>,
              private eprelService: EprelService) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close();
  }

  onScanComplete(scanResult: string) {
    this.eprelService.getProductModel(scanResult);
  }
}
