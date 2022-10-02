import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSongPage } from './add-song.page';

import { AddSongPageRoutingModule } from './add-song-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddSongPageRoutingModule
  ],
  declarations: [AddSongPage]
})
export class AddSongPageModule {}
