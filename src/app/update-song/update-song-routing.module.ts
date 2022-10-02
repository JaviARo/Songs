import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UpdateSongPage } from './update-song.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateSongPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ReactiveFormsModule],
  exports: [RouterModule],
})
export class UpdateSongPageRoutingModule {}
