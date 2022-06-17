import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public user: User;
  userRole;

  constructor(
    private authService:AuthService
  ) {}

  async ngOnInit() {
    console.log('load tab');

    //get User
    (await this.authService.getUser()).subscribe(
      user => {
        this.user = user;
        this.userRole = user.role;
        console.log(user);
      }
    );
  }

}
