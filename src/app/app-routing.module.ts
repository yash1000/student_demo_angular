import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentComponent} from './student/student.component';
import {StudentAddEditComponent} from './student/student-add-edit/student-add-edit.component';


const routes: Routes = [
  {path: '', redirectTo: 'student', pathMatch: 'full'},
  {path: 'student', component: StudentComponent},
  {path: 'add-edit-student', component: StudentAddEditComponent},
  {path: 'add-edit-student/:id', component: StudentAddEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
