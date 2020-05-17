import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Paciente } from './paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  constructor(private db: DatabaseService) { }

  save(paciente: Paciente) {
    if (paciente.id > 0) {
      return this.update(paciente);
    } else {
      return this.insert(paciente);
    }
  }

  private insert(paciente: Paciente) {
    const sql = 'insert into paciente (nomepaciente,idade,rg,cpf) values (?,?,?,?)';
    const data = [paciente.nome,paciente.idade,paciente.rg,paciente.cpf];

    return this.db.executeSQL(sql, data);
  }

  private update(paciente: Paciente) {
    const sql = 'update paciente set nomepaciente = ?,idade = ?,rg = ?,cpf = ? where id = ?';
    const data = [paciente.nome,paciente.idade,paciente.rg,paciente.cpf,paciente.id];

    return this.db.executeSQL(sql, data);
  }

  delete(id: number) {
    const sql = 'delete from paciente where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'select * from paciente where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const paciente = new Paciente();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      paciente.id = item.id;
      paciente.nome = item.name;
      paciente.idade = item.idade;
      paciente.rg = item.rg;
      paciente.cpf = item.cpf;      
    }
    return paciente;
  }

  async getAll() {
    const sql = 'select * from paciente';
    const result = await this.db.executeSQL(sql);
    const paciente = this.fillContacts(result.rows);
    return paciente;
  }

  async filter(text: string) {
    const sql = 'select * from paciente where nomepaciente like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const contacts = this.fillContacts(result.rows);
    return contacts;
  }

  private fillContacts(rows: any) {
    const pacientes: Paciente[] = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const paciente = new Paciente();
      paciente.id = item.id;
      paciente.nome = item.name;
      paciente.idade = item.idade;
      paciente.rg = item.rg;
      paciente.cpf = item.cpf;     
      pacientes.push(paciente);
    }

    return pacientes;
  }
 
}
