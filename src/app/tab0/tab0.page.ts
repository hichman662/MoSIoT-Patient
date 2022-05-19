/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { CarePlanService } from './../services/careplan.service';
import { CareActivityByTime } from './../models/careActivityByTime.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab0',
  templateUrl: './tab0.page.html',
  styleUrls: ['./tab0.page.scss'],
})
export class Tab0Page implements OnInit {
  textByValue = false;
private idScenario: number = 720896;
public careActivityByTime: CareActivityByTime[] = [];
  constructor(
    private careplanService: CarePlanService
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
