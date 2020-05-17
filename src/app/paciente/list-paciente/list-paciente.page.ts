import { Component, OnInit } from '@angular/core';
import { Paciente } from '../shared/paciente';
import { PacienteService } from '../shared/paciente.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-paciente',
  templateUrl: './list-paciente.page.html',
  styleUrls: ['./list-paciente.page.scss'],
})
export class ListPacientePage  {

  pacientes: Paciente[] = [];

  constructor(
    private pacienteService: PacienteService, 
    private toastCtrl: ToastController, 
    private alertCtrl: AlertController) { }

  ionViewWillEnter() {
    this.loadPacients();
  }

  async loadPacients() {
    this.pacientes = await this.pacienteService.getAll();
  }

  doSerchClear() {
    this.loadPacients();
  }

  async doSerchBarChange($event: any) {
    const value = $event.target.value;
    if (value && value.length >= 2) {
      this.pacientes = await this.pacienteService.filter(value);
    }
  }

  async delete(paciente: Paciente) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir o paciente: ${paciente.nome}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(paciente);
          }
        }
      ]
    });

    alert.present();
  }

  async executeDelete(paciente: Paciente) {
    try {
      // Removendo do banco de dados
      await this.pacienteService.delete(paciente.id);

      // Removendo do array
      const index = this.pacientes.indexOf(paciente);
      this.pacientes.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'paciente excluído com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir o Paciente.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}
