import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SceneDescribePageRoutingModule } from './scene-describe-routing.module';

import { SceneDescribePage } from './scene-describe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SceneDescribePageRoutingModule
  ],
  declarations: [SceneDescribePage]
})
export class SceneDescribePageModule {}
