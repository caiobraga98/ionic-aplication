import { Injectable } from '@angular/core';
import { DatabaseService } from './../../core/service/database.service';
import { Especialidade } from './Especialidade';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  constructor(private db: DatabaseService) { }

  save(especialidade: Especialidade) {
    if (especialidade.id > 0) {
      return this.update(especialidade);
    } else {
      return this.insert(especialidade);
    }
  }

  private insert(especialidade: Especialidade) {
    const sql = 'insert into especialidades (especialidade) values (?)';
    const data = [especialidade.dsespecialidade];

    return this.db.executeSQL(sql, data);
  }
  private update(especialidade: Especialidade) {
    const sql = 'update especialidades set especialidade = ? where id = ?';
    const data = [especialidade.dsespecialidade, especialidade.id];

    return this.db.executeSQL(sql, data);
  }
  delete(id: number) {
    const sql = 'delete from especialidades where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'select * from especialidades where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const especialidade = new Especialidade();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      especialidade.id = item.id;
      especialidade.dsespecialidade = item.especialidade;      
    }
    return especialidade;
  }
  async getAll() {
    const sql = 'select * from especialidades';
    const result = await this.db.executeSQL(sql);
    const especialidade = this.fillEspecialidade(result.rows);
    return especialidade;
  }
  async filter(text: string) {
    const sql = 'select * from especialidades where especialidade like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const especialidades = this.fillEspecialidade(result.rows);
    return especialidades;
  }
  private fillEspecialidade(rows: any) {
    const especialidades: Especialidade[] = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const especialidade = new Especialidade();
      especialidade.id = item.id;
      especialidade.dsespecialidade = item.dsespecialidade;
      especialidades.push(especialidade);
    }

    return especialidades;
  }

}
