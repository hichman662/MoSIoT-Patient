import { CarePlanService } from './../services/careplan.service';
import { CarePlan } from './../models/carePlan.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-care-plan',
  templateUrl: './care-plan.page.html',
  styleUrls: ['./care-plan.page.scss'],
})
export class CarePlanPage implements OnInit {

  public carePlans: CarePlan[] = [];
  public idScenario: number;
  public carePlanNull = false;
  constructor(
    private carePlanService: CarePlanService,
    public router: Router,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController

  ) { }

  ngOnInit() { }

  ionViewWillEnter(){
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        this.callCarePlans();
      }
    });
  }
  callCarePlans(){
    this.carePlanService.getCarePlanByIdScenario(this.idScenario)
    .subscribe( (res: CarePlan[]) => {
      if(res != null){
        console.log(res);
        this.carePlans = res;
        this.carePlanNull = false;
      }else{
        this.carePlans = null;
        this.carePlanNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }





}

