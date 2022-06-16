import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
// import { Booking } from 'src/app/models/report';
import { Ground } from 'src/app/models/ground';
import { ApiService } from 'src/app/services/api.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  // booking = {} as Booking;
  ground = {} as Ground;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private apiService: ApiService,
    private appService:AppService,
    private navCtrl: NavController
    ) {
    
    this.route.queryParams.subscribe(params => {
      // if (this.router.getCurrentNavigation().extras.state) {
      //   this.booking = this.router.getCurrentNavigation().extras.state.booking;
      //   console.log(this.booking);
      //   console.log("run first");
      // }
    });
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  // get ground by id for get details for example, price, image and name;
  // ngOnInit() {
  //   this.apiService.getGroundById(this.booking.groundId).subscribe(response =>{
  //     this.ground=response;
  //     console.log("ground data");
  //     console.log(this.ground);
  //   })
  // }

  ionViewWillEnter() {
    console.log("second is ionViewWillEnter");
    // this.apiService.getGroundById(this.booking.groundId).subscribe(response =>{
    //   this.ground=response;
    //   console.log("ground data");
    //   console.log(this.ground);
    // })
  }

  async addBooking() {

    this.appService.presentLoading(1);

    // await this.apiService.addBooking({ 
    //   id:this.booking.id,
    //   groundId:this.booking.groundId,
    //   day:this.booking.day,
    //   schedule:this.booking.schedule,
    //   userId:"no user",
    //   date:this.booking.date, 
    // });

    this.appService.presentLoading(0);
    this.appService.presentToast('save booking sucessull');
    this.navCtrl.navigateRoot('thank-you');

  }

  // backToDay() {

  //   //prepare data for send next page
  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       booking: this.booking
  //     }
  //   };
  //   this.router.navigate(['day'], navigationExtras);

  // }

  // backToSchedule() {

  //   //prepare data for send next page
  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       booking: this.booking
  //     }
  //   };
  //   this.router.navigate(['schedule'], navigationExtras);

  // }

}
