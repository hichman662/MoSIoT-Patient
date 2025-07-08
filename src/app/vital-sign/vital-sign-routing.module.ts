import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VitalSignPage } from './vital-sign.page';

const routes: Routes = [
  {
    path: '',
    component: VitalSignPage
  },
  {
    path: 'detail-vital-sign/:id',
    loadChildren: () => import('./detail-vital-sign/detail-vital-sign.module').then( m => m.DetailVitalSignPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VitalSignPageRoutingModule {}
