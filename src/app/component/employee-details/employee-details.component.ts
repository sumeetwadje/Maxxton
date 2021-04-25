import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'] 
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute) { }

  employeeId;
  selectedEmployee;

  ngOnInit(): void {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.employeeId = id;

    for(let key in this.employeesData){
      if (this.employeesData[key].id == this.employeeId){
        this.selectedEmployee = this.employeesData[key];
      }
    }
    console.log("this.selectedEmployee", this.selectedEmployee);
  }

  employeesData:any = this.employeeService.getEmployees();

  
}
