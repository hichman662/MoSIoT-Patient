import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextReaderPageRoutingModule } from './text-reader-routing.module';

import { TextReaderPage } from './text-reader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextReaderPageRoutingModule
  ],
  declarations: [TextReaderPage]
})
export class TextReaderPageModule {}
