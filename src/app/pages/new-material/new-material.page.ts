import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Materials } from 'src/app/models/materials';
import { ApiService } from 'src/app/services/api.service';
import { AppService } from 'src/app/services/app.service';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.page.html',
  styleUrls: ['./new-material.page.scss'],
})
export class NewMaterialPage implements OnInit {

  // if is Edit, read params
  @Input() material: Materials;

  isEditMode = false;
  form: FormGroup;

  //private id: any;
  //private users: any;
  //private categories: any;

  //private material = {} as Materials;

  constructor(
    private actRoute: ActivatedRoute,
    public apiService: ApiService,
    private navCtrl: NavController,
    private appService: AppService,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
  ) {
    //this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    console.log('run in the first moment');
    console.log(this.material)

    this.initAddOrderForm();

    //this.getUsers();
    if (this.material) {
      this.isEditMode = true;
      console.log(this.material);
      this.setFormValues();
    }
  }

  ionViewWillEnter() {
    console.log('run in the second moment');
  }

  //update forms
  setFormValues() {
    this.form.setValue({
      name: this.material.name,
      description: this.material.description,
      //categoryId: this.material.categoryId,
    });

    this.form.updateValueAndValidity();
  }

  initAddOrderForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      //categoryId: new FormControl(null, [Validators.required]),
      //userId: new FormControl([Validators]),
      //address: new FormControl([Validators])
    });
  }

  closeModal(data = null) {
    this.modalCtrl.dismiss(data);
  }

  // open(event) {
  //   this.changeLabelSelect = false;
  // }

  /**
  submitOrder() {
    this.appService.presentLoading(1);

    let response: Observable<Materials>;

    if (!this.form.value['name']) {
      this.appService.presentAlert('Field ' + this.form.value['name'] + ' not valid');
    }

    if (this.isEditMode) {
      //action update
      this.form.value['date'] = Date.now();
      this.form.value['status'] = "Pending";
      console.log(this.form)
      response = this.apiService.updateMaterial(this.material.id, this.form.value);
    } else {
      //action create

      this.form.value['date'] = Date.now();
      this.form.value['status'] = "Pending";
      console.log(this.form.value);
      response = this.apiService.createMaterial(this.form.value);
    }

    //show message and redirect
    response.pipe(take(1)).subscribe((material) => {
      this.appService.presentLoading(0);
      this.appService.presentToast('Successfully');
      console.log(material);
      this.form.reset();
      this.navCtrl.navigateRoot('/tabs/materials');

      //sent data updated in the return
      if (this.isEditMode) {
        this.closeModal(material);
      }
    });
  }
  **/

}
