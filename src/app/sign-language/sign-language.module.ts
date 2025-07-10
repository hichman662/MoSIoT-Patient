import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { SignLanguagePage } from './sign-language.page';

const routes: Routes = [
  {
    path: '',
    component: SignLanguagePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SignLanguagePage],
})
export class SignLanguagePageModule {}
