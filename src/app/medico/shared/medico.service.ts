import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Medico } from './medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private db: DatabaseService) { }

  save(medico: Medico) {
    if (medico.id > 0) {
      return this.update(medico);
    } else {
      return this.insert(medico);
    }
  }

  private insert(medico: Medico) {
    const sql = 'insert into medicos (nomemedico,crm) values (?,?)';
    const data = [medico.nomemedico,medico.crm];

    return this.db.executeSQL(sql, data);
  }
  private update(medico: Medico) {
    const sql = 'update medicos set nomemedico = ?,crm = ? where id = ?';
    const data = [medico.nomemedico, medico.id,medico.crm];

    return this.db.executeSQL(sql, data);
  }
  delete(id: number) {
    const sql = 'delete from medicos where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'select * from medicos where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const medico = new Medico();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      medico.id = item.id;
      medico.nomemedico = item.nomemedico;
      medico.crm = item.crm;      
    }
    return medico;
  }

  async getAll() {
    const sql = 'select * from medicos';
    const result = await this.db.executeSQL(sql);
    const medicos = this.fillmedicos(result.rows);
    return medicos;
  }

  async filter(text: string) {
    const sql = 'select * from medicos where nomemedico like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const contacts = this.fillmedicos(result.rows);
    return contacts;
  }
  
  private fillmedicos(rows: any) {
    const medicos: Medico[] = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const medico = new Medico();
      medico.id = item.id;
      medico.nomemedico = item.nomemedico;
      medico.crm = item.crm
      medicos.push(medico);
    }

    return medicos;
  }

}
