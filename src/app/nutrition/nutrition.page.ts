/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { Nutrition } from '../models/nutrition.model';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.page.html',
  styleUrls: ['./nutrition.page.scss'],
})
export class NutritionPage implements OnInit {

  public nutrition: Nutrition;
  public idScenario: number = 720896;
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



}
}

