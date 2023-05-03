import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddDeviceComponent} from "./add-device/add-device.component";
import {DevicesListComponent} from "./devices-list/devices-list.component";
import {CompareDevicesComponent} from "./compare-devices/compare-devices.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'add',
    component: AddDeviceComponent
  },
  {
    path: 'list',
    component: DevicesListComponent
  },
  {
    path: 'compare',
    component: CompareDevicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
