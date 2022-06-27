import { Component, OnInit } from '@angular/core';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  result = null;
  scanActive = false;

  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {
    BarcodeScanner.prepare();
  }

  async startScanner() {
    const allowed = await this.checkPermission();
    console.log('startScanner');

    if (allowed) {
      BarcodeScanner.hideBackground(); // make background of WebView transparent
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      // if the result has content
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content
        this.result = result.content;
        this.scanActive=false;
      }
    }
  };

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        // the user granted permission
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'No Permission',
          subHeader: 'Error',
          message: 'Porfavor habilite los permisos de su camara',
          buttons: [{
            text: 'No',
            role: 'Cancel'
          },
          {
            text: 'Open settings',
            handler: () => {
              BarcodeScanner.openAppSettings();
              resolve(false);
            }
          }
          ]
        });
      } else {
        resolve(true);
      }
    });
  }

  stopScanner(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    this.scanActive=false;
  }

  ngDestroy(){
    BarcodeScanner.stopScan();
  }

}
