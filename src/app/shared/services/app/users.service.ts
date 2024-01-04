import { Injectable } from '@angular/core';
import { IUsers } from '../../interfaces/IUsers';
import { RequestService } from '../core/request.service';
import { GlobalService } from '../core/global.service';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retryWhen, mergeMap, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user!: IUsers;
  private users: IUsers[] = [];

  constructor(
    private api: RequestService,
    private global: GlobalService
  ) { }

  // async getUsers() {
  //   return await new Promise<IUsers[]>(async (resolve, reject) => {
  //     this.global.spinner.show();
  //     try {
  //       const users: any = await this.api.get(`users`);
  //       if (users.error) throw new Error(users.error || users);
  //       this.users = users;
  //       resolve(this.users);
  //     } catch (ex: any) {
  //       this.global.spinner.hide();
  //       reject({ error: ex.error || ex.detail || ex });
  //     } 
  //   })
  // }

  getUsers(): Observable<IUsers[]> {
    return this.api.get('users').pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  // getUsers(): Observable<IUsers[]> {
  //   return this.api.get<IUsers[]>('users').pipe(
  //     retryWhen(errors => errors.pipe(
  //       mergeMap((error, index) => {
  //         const maxRetry = 3;
  //         if(index >= maxRetry) {
  //           throw error
  //         }
  //         const retryDelay = 1000;
  //         console.log(`Retrying (Attempt ${index + 1})...`);
  //         return timer(retryDelay);
  //       })
  //     )),
  //     catchError((error) => {
  //       this.global.spinner.hide();
  //       return throwError(error);
  //     }),
  //     finalize(() => {
  //       this.global.spinner.hide();
  //     })
  //   )
  // }

  async addNewUser(body: any) {
    return await new Promise(async (resolve, reject) => {
      this.global.spinner.show();
      try {
        const data: any = await this.api.post(`users`, body);
        if (data === undefined) throw new Error(data.message || data.error || "Can't register user");
        this.global.spinner.hide();
        resolve("register");
      } catch (ex: any) {
        this.global.spinner.hide();
        // this.global.toastAlert("Error: " + ex.error || ex.detail || ex, {
        //   cssClass: "toast-danger",
        // });
        reject({
          error: ex.detail || ex.error || ex,
        });
      }
    });
  }

  async getUserInfo(userId: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        const user: any = await this.api.get(`users/${userId}`);
        if (user === undefined) throw new Error(user.error || user);
        this.user = user as IUsers;

        resolve(this.user);
      } catch (ex: any) {
        this.global.spinner.hide();
        // this.global.toastAlert("Error: " + ex.error || ex.detail || ex, {
        //   cssClass: "toast-danger",
        // });
        reject({ error: ex.error || ex.detail || ex });
      }
    });
  }

  async updateUserInfo(user: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        const resp: any = await this.api.update(`user`, user);
        if (resp === undefined) throw new Error(resp.error || resp);

        // await this.getUserInfo();

        resolve(resp);
      } catch (ex: any) {
        this.global.spinner.hide();
        // this.global.toastAlert("Error: " + ex.error || ex.detail || ex, {
        //   cssClass: "toast-danger",
        // });
        reject({ error: ex.error || ex.detail || ex });
      }
    });
  }

  async deleteUser(userId: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        const resp: any = await this.api.delete(`users/${userId}`);
        if (resp === undefined) throw new Error(resp.error || resp);
        resolve(resp);
      } catch (ex: any) {
        this.global.spinner.hide();
        // this.global.toastAlert("Error: " + ex.error || ex.detail || ex);
        console.log(ex);
        reject({ error: ex.error || ex.detail || ex });
      }
    });
  }
}
