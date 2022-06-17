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

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  //user: User;
  private report = {} as Report;
  public user: User;
  public dateTime;
  public day;

  //important call MenuController, show icon "menu"
  constructor(
    private menu: MenuController,
    private appService: AppService,
    private apiService: ApiService,
  ) {
    this.startTime();
    this.menu.enable(true);
  }

  async ngOnInit() {
    console.log('load tab');
  }

  startTime() {
    var intervalVar = setInterval(function () {
      this.dateTime = moment().format('LTS');
    }.bind(this), 500);

    this.day = moment().locale('es').format('LL');
  }

  public addCheckOutTime() {
    this.appService.presentAlert('Hora de salida guardada: ' + this.dateTime);
  }

  public addCheckInTime() {
    this.appService.presentLoading(1);
    let response: Observable<Report>;

    //action create
    this.report.date = moment().format('L');
    this.report.check_in_time = this.dateTime;
    this.report.check_out_time = 'Pending';
    this.report.userId = 1;

    response = this.apiService.addReport(this.report);

    response.pipe(take(1)).subscribe(async (report) => {
      await this.appService.presentLoading(0);
      this.appService.presentAlert('Hora de ingreso guardada: ' + this.dateTime);
      console.log(report);
    });
  }

}
