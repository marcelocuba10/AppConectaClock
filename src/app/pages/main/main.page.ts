import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {

  constructor(
    private menu: MenuController, //icon hamburguer menu
  ) {
    console.log('Load constructor');
    this.menu.enable(true);
  }

  ngOnInit() {
    console.log("Load ngOnInit");
  }

}
