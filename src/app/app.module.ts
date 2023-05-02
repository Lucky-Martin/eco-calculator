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
import { DeviceDataComponent } from './add-device/steps/device-data/device-data.component';
import { DeviceUsageComponent } from './add-device/steps/device-usage/device-usage.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDeviceComponent,
    NavigationComponent,
    DevicesListComponent,
    CompareDevicesComponent,
    DeviceDataComponent,
    DeviceUsageComponent
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
        FormsModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
