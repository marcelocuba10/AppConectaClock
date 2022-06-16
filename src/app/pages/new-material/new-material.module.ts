import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewMaterialPageRoutingModule } from './new-material-routing.module';
import { NewMaterialPage } from './new-material.page';

//import forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewMaterialPageRoutingModule
  ],
  declarations: [NewMaterialPage]
})
export class NewMaterialPageModule {}
