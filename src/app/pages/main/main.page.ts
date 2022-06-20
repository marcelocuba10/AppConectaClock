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

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  //user: User;
  private report = {} as Report;
  reports: Report;
  public user: User;
  public dateTime;
  public day;
  public reportIdDay;

  btnCheckIn = false;
  btnCheckOut = true;

  //important call MenuController, show icon "menu"
  constructor(
    private menu: MenuController,
    private appService: AppService,
    private apiService: ApiService,
    private authService: AuthService,
    private tab: TabsPage, //variable global user from page main;
  ) {
    console.log("load constructor");
    this.startTime();
    this.CheckReport();
    this.menu.enable(true);
  }

  async ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      }
    );
    this.CheckReport();
  }

  ionViewWillEnter() {
    console.log("load ionViewWillEnter");
    this.CheckReport();
  }

  startTime() {
    var intervalVar = setInterval(function () {
      this.dateTime = moment().format('LTS'); //show only time
    }.bind(this), 500);

    this.day = moment().locale('es').format('LL');
  }

  CheckReport() {
    console.log("load CheckReport");
    console.log(this.user);
    try {
      //this.appService.presentLoading(1);
      this.apiService.getReportDay(this.user.id).subscribe((data: Report) => {
        this.reportIdDay = data[0]['id'];//get id report of current day

        if (!data) {
          //check-in time not set yet
          this.btnCheckOut = true; //disable button CheckOut
          this.btnCheckIn = false; //enable button CheckIn
        }

        if (data[0]['check_in_time']) {
          //entry time already checkIn
          this.btnCheckOut = false; //enable button CheckOut
          this.btnCheckIn = true; //disable button CheckIn
        } 

        if (data[0]['check_out_time']) {
          //entry time already checkOut
          this.btnCheckOut = true; //disable button CheckOut
          this.btnCheckIn = true; //disable button CheckIn
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
    let response: Observable<Report>;

    //action create
    this.report.date = moment().format('L');
    this.report.check_in_time = this.dateTime;
    this.report.check_out_time = 'Pending';
    this.report.user_id = this.user.id;

    response = this.apiService.addReport(this.report);

    response.pipe(take(1)).subscribe(async (report) => {
      await this.appService.presentLoading(0);
      this.appService.presentAlert('Hora de ingreso guardada: ' + this.dateTime);
    });
  }

  public addCheckOutTime() {
    this.appService.presentLoading(1);
    //block button 'Marcar Salida'
    this.btnCheckIn = true;
    let response: Observable<Report>;

    //action update
    this.report.date = moment().format('L');
    this.report.check_out_time = this.dateTime;
    this.report.user_id = this.user.id;

    response = this.apiService.updateReport(this.reportIdDay, this.report);

    response.pipe(take(1)).subscribe(async (report) => {
      await this.appService.presentLoading(0);
      this.appService.presentAlert('Hora de salida guardada: ' + this.dateTime);
    });
  }

  buttonAction() {

    this.btnCheckIn = true;
    this.btnCheckOut = false;

    // setTimeout(x => {
    //   this.btnCheckIn = true;
    // }, 30000)//30 seconds

  }

}
