import { Component, OnInit } from '@angular/core';
import { Paciente } from '../shared/paciente';
import { PacienteService } from '../shared/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.page.html',
  styleUrls: ['./form-paciente.page.scss'],
})
export class FormPacientePage implements OnInit {

  title: string = 'Paciente';
  paciente: Paciente;

  constructor(
    private pacienteService: PacienteService,
    private route: ActivatedRoute, 
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.paciente = new Paciente();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.title = 'Editar paciente';
      this.loadContact(parseInt(idParam));
    }
  }
  
  async loadContact(id: number) {
    this.paciente = await this.pacienteService.getById(id);
  }

  async onSubmit() {
    try {
      const result = await this.pacienteService.save(this.paciente);
      this.paciente.id = result.insertId;

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'paciente salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar salvar o paciente.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}
