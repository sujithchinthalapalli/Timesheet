import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Settings'
    },
    children: [
      {
        path: 'myprofile',
        loadChildren: './myprofile/myprofile.module#MyprofileModule'
      },
      {
        path: 'companyprofile',
        loadChildren: './companyprofile/companyprofile.module#CompanyprofileModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
