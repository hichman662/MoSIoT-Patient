import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAccessModePageRoutingModule } from './detail-access-mode-routing.module';

import { DetailAccessModePage } from './detail-access-mode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailAccessModePageRoutingModule
  ],
  declarations: [DetailAccessModePage]
})
export class DetailAccessModePageModule {}
