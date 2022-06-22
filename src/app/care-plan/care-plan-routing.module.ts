import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarePlanPage } from './care-plan.page';

const routes: Routes = [
  {
    path: '',
    component: CarePlanPage
  },
  {
    path: 'detail-care-plan/:Id',
    loadChildren: () => import('./detail-care-plan/detail-care-plan.module').then( m => m.DetailCarePlanPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarePlanPageRoutingModule {}
