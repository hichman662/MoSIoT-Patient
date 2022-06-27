/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { CarePlanService } from './../services/careplan.service';
import { CareActivityByTime } from './../models/careActivityByTime.model';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from './../services/user.service';
@Component({
  selector: 'app-tab0',
  templateUrl: './tab0.page.html',
  styleUrls: ['./tab0.page.scss'],
})
export class Tab0Page implements OnInit {
  load = false;
  textByValue = false;
  token = '';
private idScenario: number;

public careActivityByTime: CareActivityByTime[] = null;
  constructor(
    private careplanService: CarePlanService,
    private userService: UserService,
    private storage: Storage,

  ) {}

 ngOnInit(){
  /* this.storage.get('idScenario').then(async val => {
      this.idScenario = val;
      await this.callCareActivityByTime();
    }); */
    this.idScenario = this.userService.getIdEscenario();
    this.callCareActivityByTime();

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
    this.load = true;
});
}

}
