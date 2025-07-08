import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObjectRecognitionPage } from './object-recognition.page';

const routes: Routes = [
  {
    path: '',
    component: ObjectRecognitionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObjectRecognitionPageRoutingModule {}
