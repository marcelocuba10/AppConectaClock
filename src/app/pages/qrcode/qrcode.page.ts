import { Component, OnInit } from '@angular/core';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { UpdateMachineModalComponent } from 'src/app/modal/update-machine-modal/update-machine-modal.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  scanActive: boolean = false;
  //public QRresult;
  public QRresult='r34lvGWd';

  constructor(
    public alertController: AlertController,
    private menu: MenuController, //icon hamburguer menu
    private appService:AppService,
    private modalCtrl:ModalController
  ) {
    console.log("load constructor");
    this.menu.enable(true);
  }

  ngOnInit() {
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanActive = false;
        //alert(result.content); //The QR content will come out here
        //Handle the data as your heart desires here
        this.QRresult = result.content;
        this.openModal();
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async openModal() {
    console.log(this.QRresult);
    const modal = await this.modalCtrl.create({
      component: UpdateMachineModalComponent,
      cssClass: 'my-custom-class',
      //pass data to model, in this case id
      componentProps: {
        codeQR: this.QRresult,
      }
    });

    //go to modal
    await modal.present();
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

}
