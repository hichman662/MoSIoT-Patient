import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PractitionerPageRoutingModule } from './practitioner-routing.module';

import { PractitionerPage } from './practitioner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PractitionerPageRoutingModule
  ],
  declarations: [PractitionerPage]
})
export class PractitionerPageModule {}
