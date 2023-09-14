import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  async get(routes: string) {
    return await new Promise((resolve, reject) => { 
      this.http.get(this.url + routes).subscribe(
        (response) => resolve(response),
        (error) => reject(error)
      ) 
    })
  }

  async post(routes: string, data: any) {
    return await new Promise((resolve, reject) => { 
      this.http.post(this.url + routes, data).subscribe(
        (response) => resolve(response),
        (error) => reject(error)
      ) 
    })
  }

  async update(routes: string, data: any) {
    return await new Promise((resolve, reject) => { 
      this.http.put(this.url + routes, data).subscribe(
        (response) => resolve(response),
        (error) => reject(error)
      ) 
    })
  }

  async delete(routes: string, data: any = {}) {
    return await new Promise((resolve, reject) => { 
      this.http.delete(this.url + routes, data).subscribe(
        (response) => resolve(response),
        (error) => reject(error)
      ) 
    })
  }

  
}
