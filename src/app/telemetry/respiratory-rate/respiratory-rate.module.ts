import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespiratoryRatePageRoutingModule } from './respiratory-rate-routing.module';

import { RespiratoryRatePage } from './respiratory-rate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespiratoryRatePageRoutingModule
  ],
  declarations: [RespiratoryRatePage]
})
export class RespiratoryRatePageModule {}
