import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { User } from 'src/app/models/user';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

import { Observable } from 'rxjs';
import { Report } from 'src/app/models/report';
import { ApiService } from 'src/app/services/api.service';

import { take } from 'rxjs/operators';
import { TabsPage } from 'src/app/tabs/tabs.page';
import { DatePipe } from '@angular/common'

import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  private report = {} as Report;
  public reports: Report;
  public user: User;
  public reportIdDay;

  public btnCheckIn = true;
  public btnCheckOut = true;

  public time;
  public day;

  public latitude: number;
  public longitude: number;

  //important call MenuController, show icon "menu"
  constructor(
    private menu: MenuController, //icon hamburguer menu
    private appService: AppService,
    private apiService: ApiService,
    private authService: AuthService,
    private tab: TabsPage, //variable global user from page main;
    public datepipe: DatePipe,
  ) {
    console.log("load constructor");
    this.startTime();
    this.menu.enable(true);
  }

  async ngOnInit() {
    console.log("load ngOnInit");
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      }
    );
  }

  ionViewWillEnter() {
    console.log("load ionViewWillEnter");
    console.log(this.tab.user.id);
    this.CheckReport();
    this.getCurrentLocation();
  }

  async getCurrentLocation(){
    const coordinates = await Geolocation.getCurrentPosition().then((resp) => {
      this.latitude= resp.coords.latitude;
      this.longitude= resp.coords.longitude;
      console.log('Current position:', resp.coords);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  startTime() {
    var intervalVar = setInterval(function () {
      this.time = moment().format('LTS'); //show only time
    }.bind(this), 500);

    this.day = moment().locale('es').format('LL');
  }

  CheckReport() {
    console.log("load CheckReport");
    try {
      //this.appService.presentLoading(1);
      this.apiService.verifyReport(this.tab.user.id).subscribe((data: Report) => {
        if (Object.keys(data).length === 0) {
          //if return 0 is because it does not have registers
          this.btnCheckOut = true; //disable button CheckOut
          this.btnCheckIn = false; //enable button CheckIn

        } else {
          this.reportIdDay = data[0]['id'];//get id report of current day

          if (data[0]['check_in_time']) {
            //entry time already checkIn
            console.log('check-in ok');
            this.btnCheckOut = false; //enable button CheckOut
            this.btnCheckIn = true; //disable button CheckIn
          }

          if (data[0]['check_in_time'] && data[0]['check_out_time']) {
            //all time already check
            console.log('check-in and check-out ok');
            this.btnCheckOut = true; //disable button CheckOut
            this.btnCheckIn = true; //disable button CheckIn
          }
        }
        //this.appService.presentLoading(0);
      });
    } catch (error) {
      this.appService.presentAlert(error);
    }

  }

  public addCheckInTime() {
    this.appService.presentLoading(1);
    //block button 'Marcar Entrada'
    this.btnCheckIn = true;
    this.btnCheckOut = false;
    let response: Observable<Report>;

    //convert date and save
    const dateTem = new Date();
    this.report.date = this.datepipe.transform(dateTem, 'd-MM-yyyy');
    this.report.check_in_time = this.time;
    this.report.check_out_time = null;
    this.report.user_id = this.user.id;
    this.report.address_latitude_in = this.latitude;
    this.report.address_longitude_in = this.longitude;

    response = this.apiService.addReport(this.report);

    response.pipe(take(1)).subscribe(async (report) => {
      await this.appService.presentLoading(0);
      this.appService.presentAlert('Hora de ingreso guardada: ' + this.time);
    });
  }

  public addCheckOutTime() {
    this.appService.presentLoading(1);
    //block button 'Marcar Salida'
    this.btnCheckOut = true;
    let response: Observable<Report>;

    //action update
    this.report.check_out_time = this.time;
    this.report.user_id = this.user.id;
    this.report.address_latitude_out = this.latitude;
    this.report.address_longitude_out = this.longitude;

    response = this.apiService.updateReport(this.reportIdDay, this.report);

    response.pipe(take(1)).subscribe(async (report) => {
      await this.appService.presentLoading(0);
      this.appService.presentAlert('Hora de salida guardada: ' + this.time);
    });
  }

}
