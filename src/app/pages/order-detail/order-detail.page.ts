import { User } from '../../models/user';
import { AppService } from './../../services/app.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Orders } from 'src/app/models/orders';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  private id: any;
  private order= {} as Orders;
  private user = {} as User;
  private category = {} as Categories;

  constructor(
    private actRoute: ActivatedRoute,
    public apiService: ApiService,
    private navCtrl: NavController,
    private appService: AppService
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
  }


  getUserById() {
    this.apiService.getUserById(this.order.userId).subscribe(response => {
      this.user = response;
      console.log(this.user);
    });
  }

  // getCategoryById() {
  //   this.apiService.getCategoryById(this.order.categoryId).subscribe(response => {
  //     this.category = response;
  //     console.log(this.category);
  //   });
  // }

}
