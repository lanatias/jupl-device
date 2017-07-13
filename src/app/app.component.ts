import { Component } from '@angular/core';
import { DeviceService} from './services/deviceService';
import { Device } from "./interfaces/devices";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DeviceService]
})
export class AppComponent {
  // Properties
  deviceId: string;
  updateStatus: string;
  deviceConfigs: Device[];
  newConfig1: string;
  newConfig2: string;
  newConfig3: string;
  deviceIP: string;
  errMsg: string;
  deviceConfig: Device;

  // Constructor
  public constructor(private _deviceService: DeviceService) {
    this.deviceConfigs = this._deviceService.getDeviceConfigFields();
    this.deviceId = this.deviceConfigs[0].DeviceId;

    _deviceService.getDeviceConfigs().subscribe( dev => this.deviceConfig = dev, Error => this.errMsg = Error);
  }

  // Class methods
  public onConfigUpdate() {

    var device: Device = {
      DeviceId: this.deviceId,
      Config1: this.newConfig1,
      Config2: this.newConfig2,
      Config3: this.newConfig3
    };

    this._deviceService.updateConfig(device).subscribe( stat => this.updateStatus = stat, Error => this.errMsg = Error);

  }

  public onRefresh() {
    location.reload();
  }

}
