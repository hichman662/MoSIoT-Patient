import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorDetectionPageRoutingModule } from './color-detection-routing.module';

import { ColorDetectionPage } from './color-detection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorDetectionPageRoutingModule
  ],
  declarations: [ColorDetectionPage]
})
export class ColorDetectionPageModule {}
