import { ToastController } from '@ionic/angular';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { CarePlanService } from './../services/careplan.service';
import { CareActivityByTime } from './../models/careActivityByTime.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-care-activity',
  templateUrl: './care-activity.page.html',
  styleUrls: ['./care-activity.page.scss'],
})
export class CareActivityPage implements OnInit {
  public color: string = 'Pendent';
  load = true;
  textByValue = false;
  loadNotification = false;
  private idScenario: number ;
  public careActivityByTime: CareActivityByTime[] = [];
    constructor(
      private careplanService: CarePlanService,
      private userService: UserService,
    public toastController: ToastController
    ) { }

    ngOnInit() {
      this.idScenario = this.userService.getIdEscenario();
      this.callCareActivityByTime() ;
    }

    callCareActivityByTime() {
  this.careplanService.getCareActivityByTimeByIdScenario(this.idScenario)
  .subscribe((res: CareActivityByTime[])=>{
  this.careActivityByTime = res;
  console.log(this.careActivityByTime);
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
