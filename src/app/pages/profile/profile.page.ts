import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private appService: AppService,
    public formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      }
    );
  }

  update(form: NgForm) {

    this.authService.updateUserProfile(form.value.fname, form.value.lname, form.value.email, form.value.password, form.value.address, form.value.phone).subscribe(
      data => {
        this.appService.presentToast('updated sucessfully');
      },
      error => {
        console.log(error);
      },
      () => {

      }
    );

  }

  goBack(){
    this.navCtrl.back();
  }

}
