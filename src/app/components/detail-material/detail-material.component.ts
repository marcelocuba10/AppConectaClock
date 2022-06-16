import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Materials } from 'src/app/models/materials';
import { NewMaterialPage } from 'src/app/pages/new-material/new-material.page';
import { ApiService } from 'src/app/services/api.service';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-detail-material',
  templateUrl: './detail-material.component.html',
  styleUrls: ['./detail-material.component.scss'],
})
export class DetailMaterialComponent implements OnInit {

  //receive data from orders page
  @Input() material: Materials;
  dateOrder: string;
  user:User;

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    public datepipe: DatePipe,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    //run in the first moment

    //get User
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
        console.log(user);
      }
    );

    this.dateOrder = this.datepipe.transform(this.material.date, 'M/d/yy, h:mm a');
  }

  closeModal(role = "edit") {
    //envio los datos actualizados al listado de orders
    this.modalCtrl.dismiss(this.material, role);
  }

  async openEditModal() {
    const modal = await this.modalCtrl.create({
      component: NewMaterialPage,
      componentProps: { material: this.material }
    });

    await modal.present();

    //captura los datos actualizados
    const { data: updateMaterial } = await modal.onDidDismiss();
    if (updateMaterial) {
      this.material = updateMaterial;
    }
  }

  /**
  async onDeleteOrder() {
    const loading = await this.loadingCtrl.create({ message: "Deleting.." });
    loading.present();

    this.apiService.deleteMaterial(this.material.id).pipe(take(1)).subscribe(() => {
      console.log("Deleting item..")
      loading.dismiss();
      this.closeModal('delete');
    });
  }
  **/

}
