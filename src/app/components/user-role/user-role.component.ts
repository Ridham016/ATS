import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss'],
})
export class UserRoleComponent implements OnInit {
  selectedRole :string | undefined;
  constructor(private api : ApiService ) { }

  roleChange(id:number){
    this.api.setUserRole(id);
    console.log(this.api.getUserRole());
    window.location.reload();
  }
  ngOnInit() {}


}
