import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from 'src/app/models/report';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  private reports = {} as Report;
  report$: Observable<Report>;
  private user = {} as User;
  //user: User;

  constructor(
    private authService: AuthService,
    public apiService: ApiService,
    private appService: AppService,
  ) {
    console.log("Load constructor");
  }

  ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      }
    );
  }

  ionViewWillEnter() {

    this.apiService.getReportByUser(this.user.id).subscribe((data: Report)=>{
      this.reports = data;
      console.log(this.reports);
    });

    console.log("Load ionViewWillEnter");

    this.appService.presentLoading(1);
    console.log(this.user.id);
    this.report$ = this.apiService.getReportsByUser(1).pipe(
      tap((reports) => {
        this.appService.presentLoading(0);
        console.log(reports);
        return reports;
      })
    );
    console.log(this.report$);

  }



}
