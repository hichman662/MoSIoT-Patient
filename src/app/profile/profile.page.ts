import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';

import { Patient, UserData } from 'src/app/models/userData.model';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  public patientName: '';
  public patientDescrip: '';
  public patientData: UserData ;
  public idScenario: number ;
  segmentModel = 'details';
  load: boolean = false;
  email: string = '';
  token: string = '';

  constructor( private patientService: UserService,
    public router: Router,
    private storage: Storage) { }

 async ngOnInit() {

     await this.storage.get('idScenario').then((val) => {
      this.idScenario = val;

    });
    await this.storage.get('email').then((val) => {
      this.email = val;

    });
    await this.storage.get('token').then((val) => {
      this.token = val;

    });
    if(this.email !== ''){
      this.callingPatient();
    }

  }

callingPatient(){
  this.patientService.getPatientByEmail(this.email, this.token)
  .subscribe((res: Patient ) => {
    console.log(res);
    this.load= true;
    this.storage.set('idPatient',res[0].id);
     this.patientName = res[0].name;
     this.patientDescrip = res[0].description;
     this.patientData = res[0].userData;
    console.log(this.patientData);

  }, (err) => {
    console.log(err);
  });
}


}
