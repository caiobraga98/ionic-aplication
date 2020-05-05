import { Component, OnInit } from '@angular/core';
import { Especialidade } from '../shared/Especialidade';
import { ToastController, AlertController } from '@ionic/angular';
import { EspecialidadeService } from '../shared/especialidade.service';

@Component({
  selector: 'app-especialidade-list',
  templateUrl: './especialidade-list.page.html',
  styleUrls: ['./especialidade-list.page.scss'],
})
export class EspecialidadeListPage implements OnInit {
  especialidades: Especialidade[] = [];
  constructor(private especialidadeService: EspecialidadeService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadespecialidades();
  }

  async loadespecialidades() {
    this.especialidades = await this.especialidadeService.getAll();
  }
   doSerchClear() {
    this.loadespecialidades();
  }
  async doSerchBarChange($event: any) {
    const value = $event.target.value;
    if (value && value.length >= 2) {
      this.especialidades = await this.especialidadeService.filter(value);
    }
  }
  
  async delete(especialidade: Especialidade) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir o especialidade: ${especialidade.dsespecialidade}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(especialidade);
          }
        }
      ]
    });

    alert.present();
  }

  async executeDelete(especialidade: Especialidade) {
    try {
      // Removendo do banco de dados
      await this.especialidadeService.delete(especialidade.id);

      // Removendo do array
      const index = this.especialidades.indexOf(especialidade);
      this.especialidades.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'especialidade excluído com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir a especialidade.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}
