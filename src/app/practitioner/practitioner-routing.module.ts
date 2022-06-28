import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PractitionerPage } from './practitioner.page';

const routes: Routes = [
  {
    path: '',
    component: PractitionerPage
  },
  {
    path: 'detail-practitioner/:Id',
    loadChildren: () => import('./detail-practitioner/detail-practitioner.module').then( m => m.DetailPractitionerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PractitionerPageRoutingModule {}
