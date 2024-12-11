import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnnualexpensesComponent } from '../annualexpenses/annualexpenses.component';
import { ExpenseComponent } from '../expenses/expenses.component';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, AnnualexpensesComponent, ExpenseComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}