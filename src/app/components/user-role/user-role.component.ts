import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss'],
})
export class UserRoleComponent implements OnInit {
  selectedRole =this.api.getUserRole();
  roleID = this.api.getUserRole();
  role!: string;
  constructor(public api : ApiService ) { }

  roleChange(id:number){
    console.log(this.selectedRole)
    this.api.setUserRole(id);
    console.log(this.api.getUserRole());
    window.location.reload();
  }
  ngOnInit() {
    this.changeRole();
  }

  changeRole() {
    if (this.roleID == '1') {
      this.role = 'Admin';
      console.log('working');
    } else if (this.roleID == '2') {
      this.role = 'HR';
    } else {
      this.role ='Recruiter'
    }
  }

}
