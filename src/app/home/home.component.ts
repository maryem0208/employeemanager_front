
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public employees?: Employee[]; 
  public editEmployee?: Employee;
  public deleteEmployee?: Employee;
  public filter: string = "name";
  public email: string = "email";
  public phone: string = "phone";
  public jobtitle: string = "jobtitle";
  public name: string = "name";
 
  constructor (private employeeService: EmployeeService) {}
   ngOnInit() {
    this.getEmployees();
   }
   
  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response; 
        console.log(this.employees);
       },
       (error : HttpErrorResponse) => {
         alert(error.message);
         
       }
       );
  }
  
  public onAddEmloyee(addForm: NgForm): void {
   document.getElementById('add-employee-form')?.click();
   this.employeeService.addEmployee(addForm.value).subscribe(
     (response: Employee) => {
       console.log(response);
       this.getEmployees();
      addForm.reset();
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     addForm.reset();
     }
   );
 }
 
 public onUpdateEmloyee(employee: Employee): void {
   this.employeeService.updateEmployee(employee).subscribe(
     (response: Employee) => {
       console.log(response);
       this.getEmployees();
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
 }
 
 public onDeleteEmloyee(employeeId: number): void {
   this.employeeService.deleteEmployee(employeeId).subscribe(
     (response: void) => {
       console.log(response);
       this.getEmployees();
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
 } 
  
 public searchEmployees(key: string): void {
   
   const results: Employee[] = [];
   if (this.filter.toLowerCase()=="name") {
     for (const employee of this.employees!) {
       if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
         results.push(employee);
       }
     }
   }
   if (this.filter.toLowerCase()=="email") {
     for (const employee of this.employees!) {
       if (employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
         results.push(employee);
       }
     }
   }
   if (this.filter.toLowerCase()=="phone") {
     for (const employee of this.employees!) {
       if (employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
         results.push(employee);
       }
     }
   }
   if (this.filter.toLowerCase()=="jobtitle") {
     for (const employee of this.employees!) {
       if (employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
         results.push(employee);
       }
     }
   }
  
   this.employees = results;
   if (results.length === 0 || !key) {
     this.getEmployees();
   }
 }
 
 changeFilter(x : string) {
   
   this.filter = x; 
 }
 
 
  public onOpenModal(employee : Employee | null, mode: string) : void{
   const container = document.getElementById('main-container');
   const button = document.createElement('button');
    button.type = 'button';
    button.style.display ='none'; 
    button.setAttribute('data-toggle','modal');
    if (mode === 'add') {
       button.setAttribute('data-target','#addEmployeeModal');
    } 
    if (mode === 'edit') {
      this.editEmployee = employee!;
    button.setAttribute('data-target','#updateEmployeeModal');
  }
  if (mode === 'delete') { 
    this.deleteEmployee = employee! ;
   button.setAttribute('data-target','#deleteEmployeeModal');
 }
 
 container?.appendChild(button);
     button.click();
}
}

