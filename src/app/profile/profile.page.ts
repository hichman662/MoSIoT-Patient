/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Patient } from 'src/app/models/patient.model';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  public patientName: '';
  public patientDescrip: '';
  public patientData: UserData;
  public idScenario: number = 720896;
  public patientNull = false;
  segmentModel = 'details';

  constructor( private patientService: PatientService,
    private route: ActivatedRoute,
    private storage: Storage) { }

  ngOnInit() {
this.callingPatient();
    /* this.storage.get('idUsuario').then((val) => {
      this.idScenario = val;
        this.callingPatient();
    });*/
  }

callingPatient(){
  this.patientService.getPatientByIdScenario(this.idScenario)
  .subscribe((res: Patient ) => {
    console.log(res);
  if(res != null){
    this.storage.set('idPatient',res[0].Id);
     this.patientName = res[0].Name;
     this.patientDescrip = res[0].Description;
     this.patientData = res[0].UserData;

  }else{
    this.patientNull = true;
  }
  }, (err) => {
    console.log(err);
  });
}

}
