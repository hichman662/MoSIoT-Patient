import { ToastController, ViewWillEnter } from '@ionic/angular';
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
export class Tab0Page implements OnInit ,ViewWillEnter{

  //Telemetries
  public imTelemetry: any[] = [];
  public heartRate: any;
  public bodyTemperature: any;
  public bloodPressure: any;
  public respiratoryRate: number;
  public systolic: any;
  public diastolic: any;
  public color: string = 'Pendent';
  arraySystolic: number[]=[];
  arrayDistolic: number[]=[];
  telemetryText: string='';
  //
  load = false;
  loadNotification = false;
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
    public toastController: ToastController

  ) {}

  ionViewWillEnter(): void {
    this.idScenario = this.userService.getIdEscenario();
    this.callCareActivityByTime();
    this.callImTelemetry();
  }

 ngOnInit(){
  /* this.storage.get('idScenario').then(async val => {
      this.idScenario = val;
      await this.callCareActivityByTime();
    }); */

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
    this.myJSON = JSON.stringify(this.careActivityByTime,['name','description','timeAct']);
    console.log(this.myJSON);
     this.myJSON = this.myJSON.replace(/[&\/\\#,+()$~%.'":*?<>{}&//[////]/g, ' ');
     this.myJSON =  this.myJSON.split('name').join('Name of Activity');
     this.myJSON =  this.myJSON.split('timeAct').join(' Activity Time ');
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
        console.log(this.imTelemetry[0].teleValues[0].valu);
        for (let i = 0; i <= res.length;i++){

          if(this.imTelemetry[i]?.['name'] === 'HeartRate'){
              this.heartRate = Number(this.imTelemetry[i].teleValues[0].valu);
              console.log('heartRate: ', this.heartRate);

          }else if(this.imTelemetry[i]?.['name'] === 'BodyTemperature'){

            this.bodyTemperature = parseFloat(this.imTelemetry[i].teleValues[0].valu);
            console.log('bodyTemperature: ', this.bodyTemperature);

          }else if(this.imTelemetry[i]?.['name'] === 'RespiratoryRate'){

            this.respiratoryRate = parseFloat(this.imTelemetry[i].teleValues[0].valu);
            console.log('respiratoryRate: ', this.respiratoryRate);

          }else if(this.imTelemetry[i]?.['name'] === 'BloodPressure'){

            this.bloodPressure = this.imTelemetry[i].teleValues[0].valu;
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
  handleChange(ev,id) {
    if(ev.detail.value === '1'){
      this.presentToast('warning','can not change Complete Activity or Discard Activity to Pendent');
      return;
    }else{

    }
    this.loadNotification = true;
    console.log(id);
    console.log(ev.detail.value);
    if(ev.detail.value === 2){
      this.color='Discard';
    }
    else if((ev.detail.value === 3)){
      this.color='Complete';
    }
this.careplanService.changeStateNotification(id,ev.detail.value)
  .subscribe((res: any)=>{
    this.presentToast('success','The notification state has changed successfully.');
    this.loadNotification = false;

});

}

async presentToast(color: string , message: string) {
    const toast = await this.toastController.create({
      color: `${color}`,
      message: `${message}`,
      duration: 3500,
      position: 'bottom'
    });
    await toast.present();
  }


}
