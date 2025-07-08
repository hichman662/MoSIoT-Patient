import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObjectRecognitionPageRoutingModule } from './object-recognition-routing.module';

import { ObjectRecognitionPage } from './object-recognition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObjectRecognitionPageRoutingModule
  ],
  declarations: [ObjectRecognitionPage]
})
export class ObjectRecognitionPageModule {}
