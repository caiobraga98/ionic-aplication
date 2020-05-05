import { Component, OnInit } from '@angular/core';
import { Consulta } from '../shared/consulta';
import { ConsultaService } from '../shared/consulta.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-consulta-list',
  templateUrl: './consulta-list.page.html',
  styleUrls: ['./consulta-list.page.scss'],
})
export class ConsultaListPage implements OnInit {
  consultas: Consulta[] = [];

  constructor(private consultaService: ConsultaService, 
    private toastCtrl: ToastController, 
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadConsultas();
  }

  async loadConsultas() {
    this.consultas = await this.consultaService.getAll();
  }

  doSerchClear() {
    this.loadConsultas();
  }

  async doSerchBarChange($event: any) {
    const value = $event.target.value;
    if (value && value.length >= 2) {
      this.consultas = await this.consultaService.filter(value);
    }
  }

  async delete(consulta: Consulta) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir a consulta: ${consulta.dtconsulta}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(consulta);
          }
        }
      ]
    });

    alert.present();
  }

  async executeDelete(consulta: Consulta) {
    try {
      // Removendo do banco de dados
      await this.consultaService.delete(consulta.id);

      // Removendo do array
      const index = this.consultas.indexOf(consulta);
      this.consultas.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'consulta excluído com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir o consulta.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}
