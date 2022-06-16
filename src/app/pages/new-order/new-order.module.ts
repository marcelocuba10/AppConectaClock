import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewOrderPageRoutingModule } from './new-order-routing.module';
import { NewOrderPage } from './new-order.page';

//import forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NewOrderPageRoutingModule
  ],
  declarations: [NewOrderPage]
})
export class NewOrderPageModule {}
