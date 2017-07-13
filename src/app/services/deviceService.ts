import { Injectable } from '@angular/core';
import { Devices } from './device-data';
import { Device } from '../interfaces/devices';
import { Http, Response}  from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DeviceService {
        constructor(private _http: Http) {
    }

    private _ID: string = '40072';
    private _baseUrl: string = 'https://preprod.vbn.care/api2/v2';
    private _bearer: string = 'RJ56/Rw5vEO2WfAdPih5Lw==';

    public getDeviceConfigFields() {
        return Devices;
    }

    public getDeviceConfigs(): Observable<Device> {
        // add authorization header
        let headers = new Headers({ 'Authorization': 'Bearer ' + this._bearer });
        let options = new RequestOptions({ headers: headers });

        let url = `${this._baseUrl}/device/${this._ID}?names=RuntimeSettings`;

        return this._http.get(url, options)
                        .map(this.extractConfig)
                        .catch(this.handleError);
    }

    private extractConfig(res: Response) : Device {
      let body = res.json();
      var mydevice: Device = {
        DeviceId: this._ID,
        Config1: body.Model.RuntimeSettings.ReportInterval,
        Config2: body.Model.RuntimeSettings.PingInterval,
        Config3: body.Model.RuntimeSettings.CmfPhoneNumber
      };
      return mydevice;
    }

    public updateConfig(device: Device) : Observable<string> {

      let headers = new Headers({ 'Authorization': 'Bearer ' + this._bearer });
      headers.append('Content-Type', 'application/json');

      let options = new RequestOptions({ headers: headers });

      let url = `${this._baseUrl}/device/${this._ID}?names=RuntimeSettings`;

      let obj: any = {"RuntimeSettings":{"ReportInterval":device.Config1,"PingInterval":device.Config2,"CmfPhoneNumber":device.Config3}};

      return this._http
             .put(url, JSON.stringify(obj), options)
             .map(this.updateStatus)
             .catch(this.handleError);

    }

    private updateStatus(res: Response) : string {
      let body = res.json();
      return "Successfully updated. Please refresh.";
    }

    private handleError (error: Response | any) {
      let errMsg: string;
      if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
          errMsg = error.message ? error.message : error.toString();
      }
    return Observable.throw(errMsg);
    }

}
