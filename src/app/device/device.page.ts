import { Router } from '@angular/router';
import { DeviceService } from './../services/device.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Device } from '../models/device.model';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit {
  public devices: Device[] = [];
  public idScenario: number;
  devicesNull= false;
  constructor(
    private deviceService: DeviceService,
    public router: Router,
    private storage: Storage

  ) { }

  ngOnInit() {
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        this.callDevice();
      }
    });
  }
  callDevice(){
    this.deviceService.getDevicesByIdScenario(this.idScenario)
    .subscribe( (res: Device[]) => {
        if(res != null){
          this.devices = res;
        }else{
          this.devicesNull = true;
        }
    }, ( err) => {
        console.log(err);
    });
  }

}
