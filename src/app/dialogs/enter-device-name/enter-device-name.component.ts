import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-enter-device-name',
  templateUrl: './enter-device-name.component.html',
  styleUrls: ['./enter-device-name.component.css']
})
export class EnterDeviceNameComponent {
  name!: string;

  constructor(private dialogRef: MatDialogRef<EnterDeviceNameComponent>) { }

  onClose() {
    this.dialogRef.close(null);
  }

  onConfirm() {
    this.dialogRef.close(this.name);
  }
}
