import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCarePlanPageRoutingModule } from './detail-care-plan-routing.module';

import { DetailCarePlanPage } from './detail-care-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCarePlanPageRoutingModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
  declarations: [DetailCarePlanPage]
})
export class DetailCarePlanPageModule {}
