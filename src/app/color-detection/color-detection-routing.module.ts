import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorDetectionPage } from './color-detection.page';

const routes: Routes = [
  {
    path: '',
    component: ColorDetectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorDetectionPageRoutingModule {}
