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

  constructor(
    private modalCtrl: ModalController,
    private appService: AppService,
    private apiService: ApiService,
    private authService: AuthService,
  ) { }

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

    //show loading
    this.appService.presentLoading(1);

    await this.apiService.getMachineByQRcode(codeQR).subscribe(response => {
      this.machine = response;

      if (!this.machine) {
        this.appService.presentLoading(0);
        this.appService.presentAlert('Codigo QR no registrado');
        console.log(this.machine);
      }

      this.appService.presentLoading(0);
      console.log(this.machine);
    });
  }

  async updateMachine(form: NgForm) {

    this.appService.presentLoading(1);

    let response: Observable<Machine>;

    form.value.user_id = this.user.id;
    form.value.name = this.machine.name;
    form.value.customer_id = this.machine.customer_id;

    console.log(form.value);

    response = this.apiService.updateMachine(this.machine.codeQR,form.value);

    response.pipe(take(1)).subscribe(async (machine) => {
      await this.appService.presentLoading(0);
      this.appService.presentAlert('Maquina actualizada');
      this.dismissModal();
    });

  }


}
