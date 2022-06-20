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

  constructor(
    private authService: AuthService
  ) { }

  async ngOnInit() {
    console.log('load tab');

    //get current user
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
        console.log('user logged info tab:');
        console.log(user);
      }
    );
  }

}
