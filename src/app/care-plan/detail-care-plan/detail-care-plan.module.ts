import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCarePlanPageRoutingModule } from './detail-care-plan-routing.module';

import { DetailCarePlanPage } from './detail-care-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCarePlanPageRoutingModule
  ],
  declarations: [DetailCarePlanPage]
})
export class DetailCarePlanPageModule {}
