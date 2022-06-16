import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AppService } from './../../services/app.service';
import { Orders } from 'src/app/models/orders';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {

  // if is Edit, read params
  @Input() order: Orders;

  form: FormGroup;
  isEditMode = false;
  private id: any;
  category = {} as Categories;
  changeLabelSelect = true;

  //private users: any;
  categories$: Observable<Categories[]>;

  constructor(
    private actRoute: ActivatedRoute,
    public apiService: ApiService,
    private navCtrl: NavController,
    private appService: AppService,
    public formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.initAddOrderForm();
    //this.getCategories();

    //this.getUsers();
    if (this.order) {
      this.isEditMode = true;
      console.log(this.order);
      this.setFormValues();
      //this.getCategoryById();
    }
  }

  closeModal(data = null) {
    this.modalCtrl.dismiss(data);
  }

  open(event) {
    this.changeLabelSelect = false;
  }

  initAddOrderForm() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      //userId: new FormControl([Validators]),
      //address: new FormControl([Validators])
    });
  }

  //update forms
  setFormValues() {
    this.form.setValue({
      title: this.order.title,
      description: this.order.description,
      categoryId: this.order.categoryId,
    });

    this.form.updateValueAndValidity();
  }

  // getCategoryById() {
  //   this.apiService.getCategoryById(this.order.categoryId).subscribe((data: Categories) => {
  //     this.category = data;
  //     console.log(this.category)
  //   });
  // }

  /**
  submitOrder() {
    this.appService.presentLoading(1);

    let response: Observable<Orders>;

    if (!this.form.value['title']) {
      this.appService.presentAlert('Field ' + this.form.value['title'] + ' not valid');
    }

    if (this.isEditMode) {
      this.form.value['date'] = Date.now();
      this.form.value['status'] = "Not started";
      this.form.value['category'] = 1;
      this.form.value['categoryId'] = 1;
      response = this.apiService.updateOrder(this.order.id, this.form.value);
    } else {
      //custom input
      //this.form.value['date']= moment().locale('es').format('lll');
      this.form.value['date'] = Date.now();
      this.form.value['status'] = "Not started";
      this.form.value['category'] = 1;
      this.form.value['categoryId'] = 1;
      console.log(this.form.value);
      response = this.apiService.addOrder(this.form.value);
    }

    response.pipe(take(1)).subscribe((order) => {
      this.appService.presentLoading(0);
      this.appService.presentToast('Successfully');
      console.log(order);
      this.form.reset();
      this.navCtrl.navigateRoot('/tabs/orders');

      //show data updated after return
      if (this.isEditMode) {
        this.closeModal(order);
      }
    });
  }**/

  // getCategories() {
  //   this.categories$ = this.apiService.getCategories().pipe(
  //     tap((categories) => {
  //       return categories;
  //     })
  //   );
  //   console.log(this.categories$);
  // }

  // getUsers(){
  //   this.apiService.getUsers().subscribe(response => {
  //     this.users = response;
  //     console.log(this.users);
  //   });
  // }
}
