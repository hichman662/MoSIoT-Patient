/* eslint-disable @typescript-eslint/no-inferrable-types */
import { CarePlanService } from './../../services/careplan.service';
import { CareActivityByTime } from './../../models/careActivityByTime.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detail-care-activity',
  templateUrl: './detail-care-activity.page.html',
  styleUrls: ['./detail-care-activity.page.scss'],
})

export class DetailCareActivityPage implements OnInit {

  public idCareActivity: number;
  segmentModel = 'main';
  load: boolean = false;
  isNutrition: boolean = false;
  isCommunication: boolean = false;
  isMedication: boolean = false;
  isAppointment: boolean = false;
  public detailActivity: CareActivityByTime;
  constructor( private carePlanService: CarePlanService,
    public router: Router,
    private route: ActivatedRoute,
    private storage: Storage) { }

  ngOnInit() {
    this.idCareActivity = this.route.snapshot.params.id;
    this.callingCareActivity();
    /* this.storage.get('idUsuario').then((val) => {
      this.idScenario = val;
        this.callingPatient();
    });*/
  }

  callingCareActivity(){
  this.carePlanService.getCareActivityById(this.idCareActivity)
  .subscribe((res: CareActivityByTime ) => {
    console.log(res);
    this.detailActivity= res;
    console.log(res.valueCareActivity);


    this.load= true;
  }, (err) => {
    console.log(err);
  });
}
}
