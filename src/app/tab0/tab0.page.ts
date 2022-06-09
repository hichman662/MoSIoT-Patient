import { UserService } from './../services/user.service';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { CarePlanService } from './../services/careplan.service';
import { CareActivityByTime } from './../models/careActivityByTime.model';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab0',
  templateUrl: './tab0.page.html',
  styleUrls: ['./tab0.page.scss'],
})
export class Tab0Page implements OnInit {
  textByValue = false;
  token = '';
private idScenario: number = 720896;
public careActivityByTime: CareActivityByTime[] = [];
  constructor(
    private careplanService: CarePlanService,
    private userService: UserService,
    private storage: Storage
  ) { }

  ngOnInit() {
 this.callCareActivityByTime() ;


}


  callCareActivityByTime() {
this.careplanService.getCareActivityByTimeByIdScenario(this.idScenario)
.subscribe((res: CareActivityByTime[])=>{
this.careActivityByTime = res;
console.log(this.careActivityByTime);
});

}



}
