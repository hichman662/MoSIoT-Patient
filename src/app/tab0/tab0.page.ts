/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { CarePlanService } from './../services/careplan.service';
import { CareActivityByTime } from './../models/careActivityByTime.model';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from './../services/user.service';
import { DeviceService } from './../services/device.service';
@Component({
  selector: 'app-tab0',
  templateUrl: './tab0.page.html',
  styleUrls: ['./tab0.page.scss'],
})
export class Tab0Page implements OnInit {

  //Telemetries
  public imTelemetry: any[] = [];
  public heartRate: any;
  public bodyTemperature: any;
  public bloodPressure: any;
  public respiratoryRate: number;
  public systolic: any;
  public diastolic: any;
  arraySystolic: number[]=[];
  arrayDistolic: number[]=[];
  telemetryText: string='';
  //
  load = false;
  textByValue = false;
  token = '';
  myJSON: string ='';
private idScenario: number;

public careActivityByTime: CareActivityByTime[] = null;
  constructor(
    private careplanService: CarePlanService,
    private userService: UserService,
    private storage: Storage,
    private deviceService: DeviceService,

  ) {}

 ngOnInit(){
  /* this.storage.get('idScenario').then(async val => {
      this.idScenario = val;
      await this.callCareActivityByTime();
    }); */
    this.idScenario = this.userService.getIdEscenario();
    this.callCareActivityByTime();
    this.callImTelemetry();

}

 callCareActivityByTime() {
  this.load = false;
  this.idScenario = this.userService.getIdEscenario();
  console.log(this.idScenario);
  if(this.idScenario === undefined){
    this.storage.get('idScenario').then(async val => {
      this.idScenario = val;
      console.log("id escenario desde Storage " + this.idScenario);
      this.userService.setIdEscenario(this.idScenario);
      this.callCareActivityByTime();
    });

  }
  this.careplanService.getCareActivityByTimeByIdScenario(this.idScenario)
  .subscribe((res: CareActivityByTime[])=>{
    this.careActivityByTime = res;
    console.log(this.careActivityByTime);
    this.myJSON = JSON.stringify(this.careActivityByTime,['Name','Description','TimeAct']);
    console.log(this.myJSON);
     this.myJSON = this.myJSON.replace(/[&\/\\#,+()$~%.'":*?<>{}&//[////]/g, ' ');
     this.myJSON =  this.myJSON.split('Name').join('Name of Activity');
     this.myJSON =  this.myJSON.split('TimeAct').join(' Activity Time ');
     this.myJSON =  this.myJSON.split(/\T/g).join('Time');

     console.log(this.myJSON);
    this.storage.set('notification',this.myJSON);
    this.load = true;
});
}


  callImTelemetry(){
    this.deviceService.getImTelemetryByIdScenario(this.idScenario)
    .subscribe( (res: any) => {
        this.imTelemetry = res;
        console.log(this.imTelemetry[0].TeleValues[0].Valu);
        for (let i = 0; i <= res.length;i++){

          if(this.imTelemetry[i]?.['Name'] === 'HeartRate'){
              this.heartRate = Number(this.imTelemetry[i].TeleValues[0].Valu);
              console.log('heartRate: ', this.heartRate);

          }else if(this.imTelemetry[i]?.['Name'] === 'BodyTemperature'){

            this.bodyTemperature = parseFloat(this.imTelemetry[i].TeleValues[0].Valu);
            console.log('bodyTemperature: ', this.bodyTemperature);

          }else if(this.imTelemetry[i]?.['Name'] === 'RespiratoryRate'){

            this.respiratoryRate = parseFloat(this.imTelemetry[i].TeleValues[0].Valu);
            console.log('respiratoryRate: ', this.respiratoryRate);

          }else if(this.imTelemetry[i]?.['Name'] === 'BloodPressure'){

            this.bloodPressure = this.imTelemetry[i].TeleValues[0].Valu;
            this.systolic = Number(this.bloodPressure.split(',')[2].split(':')[1]);
            this.diastolic = Number(this.bloodPressure.split(',')[3].split(':')[1].slice(0,-1));

            this.telemetryText = `Blood Pressure: systolic is ${this.systolic} and diastolic is ${this.diastolic} . `;
            console.log(this.systolic);
            console.log(this.diastolic);
            this.storage.set('bloodPressure',this.telemetryText);
          }
        }
        console.log(this.imTelemetry);
    }, ( err) => {
        console.log(err);
    });
  }


}
