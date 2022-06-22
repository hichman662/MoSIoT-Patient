import { EntityService } from './../../services/entity.service';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Target } from './../../models/target.model';
import { Goal } from './../../models/goal.model';
import { CarePlanTemplate } from './../../models/carePlanTemplate.model';
import { CarePlanService } from './../../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarePlan } from 'src/app/models/carePlan.model';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonItemSliding, AlertController, ToastController, NavController } from '@ionic/angular';
import { Attribute } from './../../models/attribute.model';
import { Entity } from './../../models/entity.model';
@Component({
  selector: 'app-detail-care-plan',
  templateUrl: './detail-care-plan.page.html',
  styleUrls: ['./detail-care-plan.page.scss'],
})
export class DetailCarePlanPage implements OnInit {

  public carePlanTemplate: CarePlanTemplate;
  public carePlan: CarePlan;
  public carePlanName: string;
  public carePlanDescription: string;
  public goals: Goal[];
  public targets: Target[];
  carePlanDetailNull = false;
  segmentModel = 'details';
  patientProfileId: number;
  carePlanTemplateList: CarePlanTemplate[] =[];
  carePlantemplateForm: FormGroup;
  idcarePlantemplate: number;
  public attriubute: Attribute[] = [];
  private idPassedByURL: number = null;
  constructor(
    private carePlanService: CarePlanService,
    private entityService: EntityService,
    private route: ActivatedRoute,
    private storage: Storage,
    public alertController: AlertController,
    public toastController: ToastController

  ) {
      this.carePlantemplateForm = new FormGroup({
      idCarePlanTemplate: new FormControl(Number, [
        Validators.required
      ])
    });
  }


  ngOnInit() {
    this.idPassedByURL = this.route.snapshot.params.Id;
    this.callCarePlanDetail();

  }

  callCarePlanDetail(){

    this.carePlanService.getCarePlanById(this.idPassedByURL)
    .subscribe((res: CarePlan ) => {
    if(res.CarePlanTemplate != null){
      this.carePlanDetailNull = false;
      this.carePlanName = res.Name;
      this.carePlanDescription = res.Description;
      // this.carePlanTemplate = res.CarePlanTemplate;
       this.goals = res.CarePlanTemplate.Goals;
       this.targets =  res.CarePlanTemplate.Goals[0].Targets;
       console.log(this.targets);
    }else{
      this.carePlanDetailNull = true;
      this.carePlanTemplate = null;
    }
    }, (err) => {
      console.log(err);
    });
  }



}
