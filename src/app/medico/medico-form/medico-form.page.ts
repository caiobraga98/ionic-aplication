import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../shared/medico.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Medico } from '../shared/medico';

@Component({
  selector: 'app-medico-form',
  templateUrl: './medico-form.page.html',
  styleUrls: ['./medico-form.page.scss'],
})
export class MedicoFormPage implements OnInit {
  title: string = 'novo medico';
  medico: Medico;
  constructor( private medicoservice: MedicoService,
    private route: ActivatedRoute, 
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.medico = new Medico();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.title = 'Editar contato';
      this.loadContact(parseInt(idParam));
    }
  }

  async loadContact(id: number) {
    this.medico = await this.medicoservice.getById(id);
  }

  async onSubmit() {
    try {
      const result = await this.medicoservice.save(this.medico);
      this.medico.id = result.insertId;

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'medico salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar salvar o medico.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}
