import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DetailMaterialComponent } from 'src/app/components/detail-material/detail-material.component';
import { Materials } from 'src/app/models/materials';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.page.html',
  styleUrls: ['./materials.page.scss'],
})
export class MaterialsPage implements OnInit {

  //private materials: any;
  //private categories: any;
  user: User;
  materials$: Observable<Materials[]>;

  constructor(
    public apiService: ApiService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private appService: AppService,
    private menu: MenuController,
  ) {
    this.menu.enable(true);
   }

  ngOnInit() {
    console.log('run in the first moment');

    //this.getCategories();

    //get User
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
        console.log(user);
      }
    );
  }

  /**
  ionViewWillEnter() {
    console.log('run in the second moment');

    this.appService.presentLoading(1);
    this.materials$ = this.apiService.getMaterials().pipe(
      tap((materials) => {
        this.appService.presentLoading(0);
        console.log(materials);
        return materials;
      })
    );
    console.log(this.materials$);
  }
  **/

  async openDetailModal(material: Materials) {

    const modal = await this.modalCtrl.create({
      //llamamos al component
      component: DetailMaterialComponent,
      //envio el objeto al modal
      componentProps: { material }
    });

    modal.present();

    //captura los datos actualizados
    const { data: updatedMaterial, role } = await modal.onDidDismiss();
    if (updatedMaterial && role === "edit") {
      this.materials$ = this.materials$.pipe(
        map((materials) => {
          materials.forEach((element) => {
            if (element.id === updatedMaterial.id) {
              element = updatedMaterial;
            }
            return element;
          });
          return materials;
        })
      );
    }

    if (role === "delete") {
      this.materials$ = this.materials$.pipe(
        map((materials) => {
          materials.filter((element) => element.id !== updatedMaterial.id);
          return materials;
        })
      );
    }
  }

}
