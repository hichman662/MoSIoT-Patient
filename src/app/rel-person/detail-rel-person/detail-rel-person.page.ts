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
  public relPerson: RelatedPerson;
  public relPersonData: RelatedPersonData;
  segment: string;
  segmentModel = 'details';
  private idPassedByURL: number = null;
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute

  ) { }


  ngOnInit() {
    this.loading = false;
    this.idPassedByURL = this.route.snapshot.params.Id;
    this.patientService.getRelatedPersonById(this.idPassedByURL)
    .subscribe((res: RelatedPerson ) => {
      console.log(res);
      this.loading = false;
       this.relPerson= res;
       this.relPersonData = res.RpData;
       console.log(this.relPersonData);

    }, (err) => {
      console.log(err);
    });
  }

}
