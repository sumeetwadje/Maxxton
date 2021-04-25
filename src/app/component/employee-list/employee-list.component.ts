import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EmployeeService} from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private router:Router, private employeeService: EmployeeService) { }


  candidate_data:any = this.employeeService.getEmployees();

  _tempArr:any = Array.from(this.candidate_data); //shallow copied Array

  employeeName = 'Ash';
  sortByNameFlag = false;
  sortByDateFlag = false;
  clicked = false;
  removeEmployeeFlag = false;
  resultArr = [];
  resultArrDept = [];
  currentYear = new Date().getFullYear();
  resultArrYear: any = [];
  experienceFilterFlag = false;
  financeDept = 0;
  hrDept = 0;
  operationsDept = 0;
  developementDept = 0;
  distinctDeptArr = [];
  distinctDeptFlag = false;


  ngOnInit(): void {
  }

  onSelect(iObj) {
    this.router.navigate(['/employees', iObj.id])
  }

  sortByName() {
    this.sortByNameFlag = true;
    this.sortByDateFlag = false;
    this._tempArr.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    })
    console.log("_tempArr", this._tempArr)
  }

  sortByDate() {
    this.sortByDateFlag = true;
    this.sortByNameFlag = false;
    let convertedDate;
    for (let employee of this._tempArr) {
      let day = employee.joining_date.split('/')[0];
      let month = employee.joining_date.split('/')[1];
      let year = employee.joining_date.split('/')[2];
      let _date = year + '-' + month + '-' + day;
      convertedDate = new Date(_date).toJSON();
      employee['convertedDate'] = convertedDate;
    }
    this._tempArr.sort(function (a, b) {
      if (a['convertedDate'] < b['convertedDate']) { return -1; }
      if (a['convertedDate'] > b['convertedDate']) { return 1; }
      return 0;
    })
    console.log('candidate', this._tempArr);
  }

  searchByName() {
    this.clicked = true
    this.sortByDateFlag = false;
    this.sortByNameFlag = false;
    this.resultArr = this._tempArr.filter(x => x.name.toUpperCase() == this.employeeName.toUpperCase());
    console.log('candidate', this.resultArr);
  }

  experienceFilter() {
    this.experienceFilterFlag = true;
    this.resultArrYear = [];
    for (let employee of this._tempArr) {
      let year = parseInt(employee.joining_date.split('/')[2]);
      if (this.currentYear - year > 2) {
        this.resultArrYear.push(employee);
      }
    }
  }

  distinctDept() {
    this.distinctDeptFlag = true;
    for (let employee of this.candidate_data) {
      if (employee.department == 'Finance') {
        this.financeDept++;
      } else if (employee.department == 'HR') {
        this.hrDept++;
      } else if (employee.department == 'Operations') {
        this.operationsDept++;
      } else {
        this.developementDept++;
      }
    }
    this.distinctDeptArr = [{ name: 'Finance', count: this.financeDept }, { name: 'HR', count: this.hrDept }, { name: 'Operations', count: this.operationsDept }, { name: 'Development', count: this.developementDept }]
    console.log("distinctDeptArr", this.distinctDeptArr);

  }

  removeEmployee() {
    this.removeEmployeeFlag = true;
    this.resultArrDept = this._tempArr.filter(x => x.department != 'Development');
  }

}
