import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/models/report';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AppService } from 'src/app/services/app.service';

import { empty, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TabsPage } from 'src/app/tabs/tabs.page';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  user: User;
  reports: Report;

  constructor(
    private menu: MenuController, //icon hamburguer menu
    public apiService: ApiService,
    private appService: AppService,
    private tab: TabsPage, //variable global user from page main;
  ) {
    console.log("load constructor");
    this.menu.enable(true);
  }

  ngOnInit() {
    console.log("load ngOnInit");
  }

  async ionViewWillEnter() {
    console.log("load ionViewWillEnter");
    this.getReportsByUser();
  }

  async getReportsByUser() {
    console.log("load getReportsByUser");
    console.log(this.tab.user.id);

    try {
      this.apiService.getReportsByUser(this.tab.user.id).subscribe((data: Report) => {
        this.reports = data;
        console.log(this.reports);
      });
    } catch (error) {
      this.appService.presentAlert(error);
    }

  }

}
