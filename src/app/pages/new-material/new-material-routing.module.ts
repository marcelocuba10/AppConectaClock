import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewMaterialPage } from './new-material.page';

const routes: Routes = [
  {
    path: '',
    component: NewMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMaterialPageRoutingModule {}
