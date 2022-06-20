import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailRelPersonPageRoutingModule } from './detail-rel-person-routing.module';

import { DetailRelPersonPage } from './detail-rel-person.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ReactiveFormsModule,
    DetailRelPersonPageRoutingModule
  ],
  declarations: [DetailRelPersonPage]
})
export class DetailRelPersonPageModule {}
