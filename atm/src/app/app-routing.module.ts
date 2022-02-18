import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountViewComponent } from './views/account-view/account-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';

// Typescript uses single quote.
const routes: Routes = [
  {path:'',component:LoginViewComponent},
  {path:'account',component: AccountViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
