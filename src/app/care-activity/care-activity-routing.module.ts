import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareActivityPage } from './care-activity.page';

const routes: Routes = [
  {
    path: '',
    component: CareActivityPage
  },
  {
    path: 'detail-care-activity',
    loadChildren: () => import('./detail-care-activity/detail-care-activity.module').then( m => m.DetailCareActivityPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareActivityPageRoutingModule {}
