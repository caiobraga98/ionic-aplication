import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  
  { path: 'contacts', loadChildren: './contacts/contact-list/contact-list.module#ContactListPageModule' },
  { path: 'contacts/new', loadChildren: './contacts/contact-form/contact-form.module#ContactFormPageModule' },
  { path: 'contacts/edit/:id', loadChildren: './contacts/contact-form/contact-form.module#ContactFormPageModule' },
  { path: 'especialidade', loadChildren: './especialidade/especialidade-list/especialidade-list.module#EspecialidadeListPageModule' },
  { path: 'especialidade/new', loadChildren: './especialidade/especialidade-form/especialidade-form.module#EspecialidadeFormPageModule' },
  { path: 'especialidade/edit/:id', loadChildren: './especialidade/especialidade-form/especialidade-form.module#EspecialidadeFormPageModule' },
  { path: 'medico', loadChildren: './medico/medico-list/medico-list.module#MedicoListPageModule' },
  { path: 'medico/new', loadChildren: './medico/medico-form/medico-form.module#MedicoFormPageModule' },
  { path: 'medico/edit/:id', loadChildren: './medico/medico-form/medico-form.module#MedicoFormPageModule' },
  { path: 'consulta/new', loadChildren: './consulta/consulta-form/consulta-form.module#ConsultaFormPageModule' },
  { path: 'consulta/edit/:id', loadChildren: './consulta/consulta-form/consulta-form.module#ConsultaFormPageModule' },
  { path: 'consulta', loadChildren: './consulta/consulta-list/consulta-list.module#ConsultaListPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }






];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
