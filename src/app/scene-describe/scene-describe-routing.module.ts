import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SceneDescribePage } from './scene-describe.page';

const routes: Routes = [
  {
    path: '',
    component: SceneDescribePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SceneDescribePageRoutingModule {}
