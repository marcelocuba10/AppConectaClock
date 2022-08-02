import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private appService: AppService
  ) { }

  ngOnInit() {
  }

  //Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  //Call Register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  //login 
  async login(form: NgForm) {
    this.appService.presentLoading(1);
    form.value.email = "user@user.com";
    form.value.password = "teste123";
    await this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        //this.appService.presentToast('Logged In');
        console.log("Logged In, Welcome!");
      },
      error => {
        this.appService.presentLoading(0);
        console.log(error);
        this.appService.presentAlert("Oops! usuario no encontrado, verifique los datos");
      },
      () => {
        this.dismissLogin();
        this.appService.presentLoading(0);
        this.navCtrl.navigateRoot('tabs/main');
      }
    );
  }

}
