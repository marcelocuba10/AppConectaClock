import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
// import { Booking } from 'src/app/models/report';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})

export class SchedulePage implements OnInit {

  // booking = {} as Booking;
  //schedule = {} as Schedule;
  bookings = [];
  schedules = [];
  reserved = [];
  notReserved = [];
  daySelected = [];

  ground: any = [];
  schedules_selected = [];
  private schedulesSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public apiService: ApiService,
    private appService: AppService,
  ) {

    this.route.queryParams.subscribe(params => {
      // if (this.router.getCurrentNavigation().extras.state) {
      //   this.booking = this.router.getCurrentNavigation().extras.state.booking;
      //   console.log(this.booking);
      // }
    });
    console.log("Load constructor");
  }

  ngOnInit() {
    console.log("Load ngOnInit");
  }

  ionViewWillEnter() {

    console.log("Load ionViewWillEnter");
    
    this.appService.presentLoading(1);
    // this.apiService.getGroundById(this.booking.groundId).subscribe(response => {
    //   this.ground = response;
    //   console.log(this.ground);
    //   this.schedules_selected = this.ground.schedule;

    //   //check if found schedules
    //   if (Array.isArray(this.ground) || this.ground != null) {
    //     this.appService.presentLoading(0);
    //     console.log(this.ground);
    //   } else {
    //     this.appService.presentLoading(0);
    //     this.appService.presentAlert('Sin horarios disponibles por el momento');
    //     console.log("No schedules results");
    //   }
    // });

    //get schedules
    // this.apiService.getSchedules().subscribe(res => {
    //   this.schedules = res;
    //   console.log("muestra todos los horarios")
    //   console.log(this.schedules);
    // });

    //get all bookings
    // this.apiService.getBookings().subscribe(res => {
    //   this.bookings = res;

    //   console.log("muestra todos las reservas")
    //   console.log(this.bookings);

    //   //filter & save bookings by day selected in array
    //   console.log("filter booking by day selected")
    //   let i = 0;
    //   this.bookings.forEach(element => {
    //     if (element['day'] == this.booking.day) {

    //       this.daySelected[i] = element;
    //       i++;

    //     } else {
    //       console.log("not day found select or day not same");
    //       i++;
    //     }

    //   });

    //   console.log("day booking selected");
    //   console.log(this.daySelected);

    //   let b = 0;
    //   this.daySelected.forEach(element => {
    //     console.log('for dayselected');
    //     this.schedules.forEach(item => {
    //       if (element['schedule'] == item['name']) {
    //         console.log('schedule not available');
    //         item['status'] = null;
    //       }
    //     })
    //   });

    //   console.log(this.schedules)

    // });
  }

  // addBooking(schedule:any) {

  //   //save parameter data selected in array booking
  //   this.booking.schedule = schedule;
  //   //prepare data for send next page
  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       booking: this.booking
  //     }
  //   };
  //   this.router.navigate(['details'], navigationExtras);

  // }

}
