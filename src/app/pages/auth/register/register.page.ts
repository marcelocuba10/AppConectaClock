import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private appService: AppService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }

  // call login modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

  //register
  async register(form: NgForm) {
    this.appService.presentLoading(1);
    await this.authService.register(form.value.name, form.value.email, form.value.password).subscribe(
      data => {
        console.log('register inside');
        this.authService.login(form.value.email, form.value.password).subscribe(
          () => {
          },
          error => {
            this.appService.presentLoading(0);
            console.log(error);
            this.appService.presentAlert("Oops! error al registrarse");
          },
          () => {
            this.dismissRegister();
            this.appService.presentLoading(0);
            this.navCtrl.navigateRoot('tabs/main');
          }
        );
        //this.appService.presentToast('registro con sucesso');
        console.log('Registered account');
      },
      error => {
        this.appService.presentLoading(0);
        console.log(error);
        this.appService.presentAlert("Oops! verifique los datos ingresados");
      },
      () => {

      }
    );
  }

}
