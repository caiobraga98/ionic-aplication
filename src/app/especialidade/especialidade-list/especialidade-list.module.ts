import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EspecialidadeListPage } from './especialidade-list.page';

const routes: Routes = [
  {
    path: '',
    component: EspecialidadeListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EspecialidadeListPage]
})
export class EspecialidadeListPageModule {}
