import { Component, OnInit } from '@angular/core';
import { Especialidade } from '../shared/Especialidade';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EspecialidadeService } from '../shared/especialidade.service';

@Component({
  selector: 'app-especialidade-form',
  templateUrl: './especialidade-form.page.html',
  styleUrls: ['./especialidade-form.page.scss'],
})
export class EspecialidadeFormPage implements OnInit {
  title: string = 'Nova especialidade';
  especialidade: Especialidade;
  constructor(private especialidadeService: EspecialidadeService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.especialidade = new Especialidade();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.title = 'Editar contato';
      this.loadEspecialidade(parseInt(idParam));
    }

  }
   
  async loadEspecialidade(id: number) {
    this.especialidade = await this.especialidadeService.getById(id);
  }
  async onSubmit() {
    try {
      const result = await this.especialidadeService.save(this.especialidade);
      this.especialidade.id = result.insertId;

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'especialidade salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar salvar o especialidade.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }


}
