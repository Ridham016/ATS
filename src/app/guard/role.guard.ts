import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private api:ApiService
    )
    {}
  canActivate( ): boolean {
    const Role = this.api.RoleId;

    // if (!Role || Role !== 1) {
    //   return false;
    // }

    return true;
  }

}
