import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextReaderPage } from './text-reader.page';

const routes: Routes = [
  {
    path: '',
    component: TextReaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextReaderPageRoutingModule {}
