import { UserService } from './../services/user.service';
import { UserData } from 'src/app/models/userData.model';
import { Router } from '@angular/router';
import { PatientService } from './../services/patient.service';
import { Practitioner } from './../models/practitioner.model';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-practitioner',
  templateUrl: './practitioner.page.html',
  styleUrls: ['./practitioner.page.scss'],
})
export class PractitionerPage implements OnInit {

  public practitioners: Practitioner[] = [];
  public practitionerNull = false;
  public idScenario: number;
  public allUsers: UserData[] = [];
  constructor(
    private patientService: PatientService,
    public userService: UserService,
    public router: Router,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit(): void{

  }
  ionViewWillEnter(){
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        //this.callPractitioner();
        this.callAllUsers();
      }
    });

  }

  callAllUsers(){
    this.userService.getAllUsersByIdEscenario(this.idScenario).subscribe((res: UserData[])=>{
      if(res != null){
      this.allUsers = res;
      }else
      {
        this.allUsers = null;
        this.practitionerNull= true;
      }
      console.log(res);
    }, ( err) => {
        console.log(err);
    });
    }


  callPractitioner(){
    this.patientService.getPractitionerByIdScenario(this.idScenario)
    .subscribe( (res: any) => {
      if(res != null){
        this.practitioners = res;
        this.practitionerNull = false;
      }else{
        this.practitioners = null;
        this.practitionerNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

}
