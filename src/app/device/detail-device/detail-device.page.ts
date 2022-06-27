import { DeviceTemplate } from './../../models/deviceTemplate.model';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from './../../services/device.service';
import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device.model';
@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.page.html',
  styleUrls: ['./detail-device.page.scss'],
})
export class DetailDevicePage implements OnInit {

  public deviceName: string;
  public deviceDescrip: string;
  public deviceData: Device;
  public deviceTemplate: DeviceTemplate;
  segmentModel = 'details';
  load = false;
  private idPassedByURL: number = null;
  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.load = true;
    this.idPassedByURL = this.route.snapshot.params.Id;
    this.deviceService.getDeviceById(this.idPassedByURL)
    .subscribe((res: Device ) => {
      console.log(res);
    if(res != null){
      this.load = false;
       this.deviceName = res.Name;
       this.deviceDescrip = res.Description;
       this.deviceData = res;
       this.deviceTemplate = res.DeviceTemplate;

    }
    }, (err) => {
      console.log(err);
    });
  }

}
