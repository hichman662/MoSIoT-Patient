/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { AccessMode } from './../../models/accessMode.model';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { PatientAccess } from 'src/app/models/patientAccess.model';

@Component({
  selector: 'app-detail-patient-access',
  templateUrl: './detail-patient-access.page.html',
  styleUrls: ['./detail-patient-access.page.scss'],
})
export class DetailPatientAccessPage implements OnInit {

  public patientAccessName: string = '';
  public patientAccessDescrip: string = '';
  public accessMode: AccessMode;
  patientProfileId: number;
  segmentModel = 'details';
  patientAccessDetailNull = false;
  private idPassedByURL: number = null;
  idAccessMode: number;
  name = '';
  loading = false;
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private storage: Storage,
    public alertController: AlertController

  ) {}


  ngOnInit() {
    this.idPassedByURL = this.route.snapshot.params.id;
    this.callingAccessdatil();
  }

  callingAccessdatil(){
    this.loading = true;
    this.patientService.getPatientAccessById(this.idPassedByURL)
    .subscribe((res: PatientAccess) => {
     // console.log(res);
      this.loading = false;
      this.patientAccessDetailNull = false;
      /* this.patientAccessDescrip = res.description;
      this.patientAccessName = res.name;  */
       if(res != null){
       this.accessMode = res.accessMode;
       console.log(res);
       this.patientAccessDetailNull = false;

    }else{
      this.patientAccessDetailNull = true;
      this.accessMode= null;
    }
    }, (err) => {
      console.log(err);
    });

    this.storage.get('idPatientProfile').then((val) => {
      if(val != null){
        this.patientProfileId= val;
        //this.accessModeId();
      }
    });

  }
/* accessModeId() {
  this.patientService.getAccessModeByIdPatientprofile(this.patientProfileId)
    .subscribe((res: any ) => {
      this.allAccessMode = res;
    }, (err) => {
      console.log(err);
    });
  } */


}

