import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPatientAccessPageRoutingModule } from './detail-patient-access-routing.module';

import { DetailPatientAccessPage } from './detail-patient-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPatientAccessPageRoutingModule
  ],
  declarations: [DetailPatientAccessPage]
})
export class DetailPatientAccessPageModule {}
