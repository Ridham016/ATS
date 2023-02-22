import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http/ngx";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl='https://cc9f-116-72-9-56.in.ngrok.io/api/';
  constructor(private api:HTTP) { }
}
