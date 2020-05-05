import { Component, OnInit } from '@angular/core';
import { Medico } from '../shared/medico';
import { MedicoService } from '../shared/medico.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-medico-list',
  templateUrl: './medico-list.page.html',
  styleUrls: ['./medico-list.page.scss'],
})
export class MedicoListPage implements OnInit {
  medicos: Medico[] = [];
  constructor( private medicoService: MedicoService, 
    private toastCtrl: ToastController, 
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadMedicos();
  }
  async loadMedicos() {
    this.medicos = await this.medicoService.getAll();
  }
  doSerchClear() {
    this.loadMedicos();
  }

  async doSerchBarChange($event: any) {
    const value = $event.target.value;
    if (value && value.length >= 2) {
      this.medicos = await this.medicoService.filter(value);
    }
  }
  async delete(medico: Medico) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir o medico: ${medico.nomemedico}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(medico);
          }
        }
      ]
    });

    alert.present();
  }
  async executeDelete(medico: Medico) {
    try {
      // Removendo do banco de dados
      await this.medicoService.delete(medico.id);

      // Removendo do array
      const index = this.medicos.indexOf(medico);
      this.medicos.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'medico excluído com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir o medico.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}
