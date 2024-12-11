/*import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseComponent } from './components/expenses/expenses.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
            }
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'expenses',
                component: ExpenseComponent,
                
            }
        ]
    }
];*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseComponent } from './components/expenses/expenses.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
    },
    { path: '', redirectTo: '/signup', pathMatch: 'full' },
  {
    path: 'signup',
    component: SignupComponent
},
  { path: 'layout', component: LayoutComponent, 
    children: [
  { path: 'dashboard', component: DashboardComponent },
    ]},
    { path: 'layout', component: LayoutComponent, 
        children: [
  { path: 'expenses', component: ExpenseComponent },
        ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
    
}

