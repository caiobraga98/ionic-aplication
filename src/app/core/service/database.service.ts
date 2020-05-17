import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: SQLiteObject;
  databaseName: string = 'contatos.db';

  constructor(private sqlite: SQLite, private sqlitePorter: SQLitePorter) { }

  async openDatabase() {
    try {
      this.db = await this.sqlite.create({ name: this.databaseName, location: 'default' });
      await this.createDatabase();
    } catch (error) {
      console.error('Ocorreu um erro ao criar o banco de dados', error);
    }
  }

  async createDatabase() {
    const sqlCreateDatabase = this.getCreateTable();
    const result = await this.sqlitePorter.importSqlToDb(this.db, sqlCreateDatabase);
    return result ? true : false;
  }

  getCreateTable() {
    const sqls = [];
    sqls.push('CREATE TABLE IF NOT EXISTS contacts (id integer primary key AUTOINCREMENT, name varchar(100));');
    sqls.push('CREATE TABLE IF NOT EXISTS especialidades (id integer primary key AUTOINCREMENT, especialidade varchar(100));');
    sqls.push('CREATE TABLE IF NOT EXISTS medicos (id integer primary key AUTOINCREMENT, nomemedico varchar(100),crm varchar(100));');
    sqls.push('CREATE TABLE IF NOT EXISTS consultas (id integer primary key AUTOINCREMENT, dtconsulta varchar(100));');
    sqls.push('CREATE TABLE IF NOT EXISTS paciente (id integer primary key AUTOINCREMENT,nomepaciente varchar(100),idade integer,rg integer,cpf integer)')
    return sqls.join('\n');
  }

  executeSQL(sql: string, params?: any[]) {
    return this.db.executeSql(sql, params);
  }
}
