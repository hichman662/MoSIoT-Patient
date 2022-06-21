import { MatExpansionModule } from '@angular/material/expansion';
import { DetailAccessModeComponent } from './../detail-access-mode/detail-access-mode.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPatientAccessPageRoutingModule } from './detail-patient-access-routing.module';

import { DetailPatientAccessPage } from './detail-patient-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPatientAccessPageRoutingModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
  declarations: [DetailPatientAccessPage, DetailAccessModeComponent]
})
export class DetailPatientAccessPageModule {}
