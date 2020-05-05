import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Consulta } from './consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private db: DatabaseService) { }

  save(consulta: Consulta) {
    if (consulta.id > 0) {
      return this.update(consulta);
    } else {
      return this.insert(consulta);
    }
  }
  private insert(consulta: Consulta) {
    const sql = 'insert into consultas (dtconsulta) values (?)';
    const data = [consulta.dtconsulta];

    return this.db.executeSQL(sql, data);
  }

  private update(consulta: Consulta) {
    const sql = 'update consultas set dtconsulta = ? where id = ?';
    const data = [consulta.dtconsulta, consulta.id];

    return this.db.executeSQL(sql, data);
  }
  delete(id: number) {
    const sql = 'delete from consultas where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }
  async getById(id: number) {
    const sql = 'select * from consultas where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const consulta = new Consulta();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      consulta.id = item.id;
      consulta.dtconsulta = item.dtconsulta;      
    }
    return consulta;
  }
  async getAll() {
    const sql = 'select * from consultas';
    const result = await this.db.executeSQL(sql);
    const consultas = this.fillconsultas(result.rows);
    return consultas;
  }
  async filter(text: string) {
    const sql = 'select * from consultas where dtconsulta like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const consultas = this.fillconsultas(result.rows);
    return consultas;
  }
  private fillconsultas(rows: any) {
    const consultas: Consulta[] = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const consulta = new Consulta();
      consulta.id = item.id;
      consulta.dtconsulta = item.dtconsulta;
      consultas.push(consulta);
    }

    return consultas;
  }

}
