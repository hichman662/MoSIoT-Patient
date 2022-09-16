import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { EntityService } from './../../services/entity.service';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Patient } from './../../models/patient.model';
import { Disability } from './../../models/disability.model';
import { Condition } from './../../models/condition.model';
import { PatientService } from './../../services/patient.service';
import { PatientProfile } from './../../models/patientProfile.model';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController ,IonItemSliding,ToastController} from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.component.html',
  styleUrls: ['./detail-profile.component.scss'],
})
export class DetailProfileComponent implements OnInit {


  public patientProfile: PatientProfile ;
  public diseases: Condition [] = [];
  public disabilities: Disability [] = [];
  public idScenario: number = 720896;
  segmentModel = 'details';
  load: boolean = false;
  email: string = '';

  constructor( private patientService: PatientService,
    public navCtrl: NavController,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage) { }

  async ngOnInit() {

    /* this.storage.get('idUsuario').then((val) => {
      this.idScenario = val;
        this.callingPatient();
    });*/
    await this.storage.get('email').then((val) => {
      this.email = val;

    });
    if(this.email !== ''){
      this.callingPatientDetails();
    }
  }

  callingPatientDetails(){
    this.patientService.getPatientByEmail(this.email)
  .subscribe((res: Patient ) => {
    console.log(res);
    this.load= true;

     this.patientProfile = res[0].PatientProfile;
     console.log(this.patientProfile);
     this.diseases = res[0].PatientProfile.Diseases;
     console.log(this.diseases);
     this.disabilities = res[0].PatientProfile.Disabilities;
     console.log(this.disabilities);

  }, (err) => {
    console.log(err);
  });
}
}
