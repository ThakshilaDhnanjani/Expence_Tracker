import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface expenses {
  id: number;
  category: string;
  description: string;
  date: Date;
  amount: string;
  user_id: number;
}


@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpenseComponent {
  isSidePanelVisible = false;
  isSidePanelVisibleEdit = false;
  expenses: expenses[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadexpenses();
  }

  loadexpenses() {
    this.http.get<any>(`http://localhost:5000/api/expenses/get`)
        .subscribe(
          (res) => {
    this.expenses = res.data;
    console.log(res);
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
    }


 
  expenseObj: any = {
    "expenseID": 0,
    "category": "string",
    "description": "string",
    "date": Date,
    "amount": 0.00,
  };

  openSidePanel(){
    this.isSidePanelVisible = true;
    this.isSidePanelVisibleEdit = false;
  }

  closeSidePanel(){
    this.isSidePanelVisible = false;
    this.isSidePanelVisibleEdit = false;
  }
  openSidePanelEdit(){
    this.isSidePanelVisibleEdit = true;
    this.isSidePanelVisible= false;
  }

  closeSidePanelEdit(){
    this.isSidePanelVisible = false;
    this.isSidePanelVisibleEdit = false;
  }

  /*deleteExpense(index: number){
    this.expenses.splice(index, 1);
  }*/
    deleteExpense(expenseID: number,) {
      this.http.delete(`http://localhost:5000/api/expenses/delete/${expenseID}`)
        .subscribe(
          (res) => {
            alert('Expense deleted successfully');
            console.log('Deleted expense:', res);
          },
          (error) => {
            alert('Failed to delete expense');
            console.error('Error deleting expense:', error);
          }
        );
    }
    
  /*
  editExpense(index: number){
    this.expenseObj = this.expenses[index];
    this.openSidePanel();
  }
*/
editExpense(expenseID: number) {

  // Make an HTTP request to fetch the specific expense data from the backend
  this.http.get<any>(`http://localhost:5000/api/expenses/get/${expenseID}`)
    .subscribe(
      (res) => {
        // Populate expenseObj with the returned data for editing
        this.expenseObj = res.data;
        
        // Open the side panel for editing
        this.openSidePanelEdit();
      },
      (error) => {
        alert('Failed to fetch expense data');
        console.error('Error fetching expense:', error);
      }
    );
}
editandsaveexpense() {
  const expenseData = { ...this.expenseObj };
  this.http.put<any>(`http://localhost:5000/api/expenses/update/${expenseData.id}`, expenseData).subscribe(
    (res) => {
      alert('Expense updated successfully');
      this.loadexpenses();
      this.closeSidePanelEdit();
    },
    (error) => {
      alert('Failed to update expense');
      console.error('Error updating expense:', error);
    }
  );
}





  createexpense() {
    const expenseData = {
      category: this.expenseObj.category,
      description: this.expenseObj.description,
      date: this.expenseObj.date,
      amount: this.expenseObj.amount
    };
      
    this.http.post(`http://localhost:5000/api/expenses/add`, expenseData)
        .subscribe(
          (res) => {
            alert('Success');
            this.expenseObj = {
              category: '',
              description: '',
              date: '',
              amount: null };
            this.closeSidePanel();
    console.log(res);
          },
          (error) => {
            alert('Unsuccess');
            console.error('Error fetching user data:', error);
          }
        );
    }
}