import { Measure } from './../../models/measure.model';
import { VitalSign } from './../../models/vitalSign.model';
import { CarePlanService } from './../../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-vital-sign',
  templateUrl: './detail-vital-sign.page.html',
  styleUrls: ['./detail-vital-sign.page.scss'],
})
export class DetailVitalSignPage implements OnInit {
load = false;
  public vitalSignName: string;
  public vitalSignDescrip: string;
  public measureVitalSign: Measure;
  public vitalSign: VitalSign;
  segmentModel = 'details';
  private idPassedByURL: number = null;
  constructor(
    private carePlanService: CarePlanService,
    private route: ActivatedRoute

  ) { }


  ngOnInit() {
    this.load= true;
    this.idPassedByURL = this.route.snapshot.params.Id;
    this.carePlanService.getVitalSignById(this.idPassedByURL)
    .subscribe((res: VitalSign ) => {
      console.log(res);
    if(res != null){
      this.load= false;

      this.vitalSign = res;
       this.vitalSignName = res.Name;
       this.vitalSignDescrip = res.Description;
       this.measureVitalSign = this.vitalSign.MeasureVitalSign;

    }
    }, (err) => {
      console.log(err);
    });
  }
}
