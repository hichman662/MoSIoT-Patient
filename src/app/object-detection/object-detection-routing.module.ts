import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObjectDetectionPage } from './object-detection.page';

const routes: Routes = [
  {
    path: '',
    component: ObjectDetectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObjectDetectionPageRoutingModule {}
