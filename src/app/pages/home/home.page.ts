import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { ApiService } from './../../services/api.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  grounds: any;
  // booking = {} as Booking;
  // booking$: Observable<Booking[]>;
  //grounds$: Observable<Ground[]>;

  constructor(
    private router: Router,
    public apiService: ApiService,
    public appService: AppService
  ) {
    console.log('Load constructor');
  }

  ngOnInit() {
    console.log("Load ngOnInit");
  }



  //send data for next page, in this case page day
  // addBooking(ground: Ground) {
  //   this.booking.id = Date.now();
  //   this.booking.groundId = ground.id;
  //   this.booking.date = Date.now();

  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       booking: this.booking
  //     }
  //   };

  //   this.router.navigate(['day'], navigationExtras);
  // }

}
