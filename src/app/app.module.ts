import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { AddDeviceComponent } from './add-device/add-device.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from './navigation/navigation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { CompareDevicesComponent } from './compare-devices/compare-devices.component';
import {MatListModule} from "@angular/material/list";

import { DeviceDataComponent } from './add-device/steps/device-data/device-data.component';
import { DeviceUsageComponent } from './add-device/steps/device-usage/device-usage.component';
import { DeviceScoreComponent } from './add-device/steps/device-score/device-score.component';
import {MatTableModule} from "@angular/material/table";
import { DeviceFootprintPreviewComponent } from './devices-list/dialogs/device-footprint-preview/device-footprint-preview.component';
import {MatDialogModule} from "@angular/material/dialog";
import { SelectDeviceComponent } from './compare-devices/select-device/select-device.component';
import {MatTreeModule} from "@angular/material/tree";
import { EnergyClassColorComponent } from './shared/energy-class-color/energy-class-color.component';
import { FeedbackComponent } from './dialogs/feedback/feedback.component';
import { StarsRatingComponent } from './dialogs/feedback/stars-rating/stars-rating.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { EnterDeviceNameComponent } from './dialogs/enter-device-name/enter-device-name.component';
import { ScanEnergyLabelQrComponent } from './add-device/steps/device-data/dialogs/scan-energy-label-qr/scan-energy-label-qr.component';
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AddDeviceComponent,
    NavigationComponent,
    DevicesListComponent,
    CompareDevicesComponent,
    DeviceDataComponent,
    DeviceUsageComponent,
    DeviceScoreComponent,
    DeviceFootprintPreviewComponent,
    SelectDeviceComponent,
    EnergyClassColorComponent,
    FeedbackComponent,
    StarsRatingComponent,
    EnterDeviceNameComponent,
    ScanEnergyLabelQrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatTreeModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ZXingScannerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
