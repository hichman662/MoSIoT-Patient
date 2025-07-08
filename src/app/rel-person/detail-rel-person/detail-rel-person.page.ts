import { UserService } from './../../services/user.service';
import { UserData } from 'src/app/models/userData.model';
import { RelatedPersonData } from './../../models/relatedPersonData.model';
import { RelatedPerson } from './../../models/relatedPerson.model';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-rel-person',
  templateUrl: './detail-rel-person.page.html',
  styleUrls: ['./detail-rel-person.page.scss'],
})


export class DetailRelPersonPage implements OnInit {

  loading = false;
  public relPerson: UserData;
  public user: UserData;
  public relPersonData: RelatedPersonData;
  segment: string;
  segmentModel = 'details';
  private idPassedByURL: number = null;
  constructor(
    private patientService: PatientService,
    private userService: UserService,
    private route: ActivatedRoute

  ) { }


  ngOnInit() {
    this.loading = false;
    this.idPassedByURL = this.route.snapshot.params.id;
    /* this.patientService.getRelatedPersonById(this.idPassedByURL)
    .subscribe((res: RelatedPerson ) => {
      console.log(res);
      this.loading = false;
       this.relPerson= res;
       this.relPersonData = res;
       console.log(this.relPersonData);

    }, (err) => {
      console.log(err);
    });
  } */
  console.log(this.idPassedByURL);
  this.userService.getUserById(this.idPassedByURL)
  .subscribe((res: UserData ) => {
    console.log(res);
    this.loading = false;
     this.relPerson= res;
     console.log(this.relPerson);

  }, (err) => {
    console.log(err);
  });
}


}
