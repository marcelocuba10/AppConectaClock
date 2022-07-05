import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Machine } from 'src/app/models/machine';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-update-machine-modal',
  templateUrl: './update-machine-modal.component.html',
  styleUrls: ['./update-machine-modal.component.scss'],
})

export class UpdateMachineModalComponent implements OnInit {

  //receive data from qrcode page
  @Input() codeQR: string;

  user: User;
  machine: Machine;
  //toggleValueStatus: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private appService: AppService,
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    //get User
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
        console.log(user);
      }
    );
    this.getMachineByQRcode(this.codeQR);
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async getMachineByQRcode(codeQR: string) {

    this.appService.presentLoading(1);
    await this.apiService.getMachineByQRcode(codeQR).subscribe(response => {
      if (response == null) {
        this.appService.presentLoading(0);
        this.appService.presentAlert('Codigo QR no registrado');
      } else {
        this.machine = response;
        // //toggle status
        // if (this.machine.status == "Encendido") {
        //   this.toggleValueStatus = true;
        // }
        // if (this.machine.status == "Apagado") {
        //   this.toggleValueStatus = false;
        // }

        this.appService.presentLoading(0);
      }
    });

  }

  async updateMachine(form: NgForm) {

    this.appService.presentLoading(1);
    console.log(form.value.status);
    //pass data
    this.machine.user_id = this.user.id;
    this.machine.observation = form.value.observation;
    this.machine.status = form.value.status;

    // if (this.toggleValueStatus == true) {
    //   console.log('Encendido');
    //   this.machine.status = "Encendido";
    // } else {
    //   console.log('Apagado');
    //   this.machine.status = "Apagado";
    // }

    let response: Observable<Machine>;
    response = this.apiService.updateMachine(this.machine.codeQR, this.machine);

    response.pipe(take(1)).subscribe((machine) => {
      this.appService.presentLoading(0);
      this.appService.presentAlert('Maquina actualizada');
      this.dismissModal();
    });

  }


}
