import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalModule } from 'ngx-bootstrap/modal';
// import { AlertModule } from 'ngx-bootstrap/alert';

import { AppComponent } from './app.component';
import { UserFormComponent } from './shared/components/forms/user-form/user-form.component';
import { UsersListComponent } from './shared/components/users/users-list/users-list.component';
import { HttpInterceptorInterceptor } from './shared/interceptors/http-interceptor.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalService } from './shared/services/core/global.service';
import { AlertComponentComponent } from './shared/components/ui/alert-component/alert-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function initializeApp(globals: GlobalService) {
  return async (): Promise<void> => {
    try {
      setTimeout(async () => { 
        // globals.spinner.hide(); 
      }, 2000);
      
    } catch (error) {
      console.log(error)
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ModalModule.forRoot(),
    // AlertModule.forRoot(),
    UserFormComponent,
    UsersListComponent,
    AlertComponentComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GlobalService,
    { 
      provide: APP_INITIALIZER, 
      useFactory: initializeApp,
      deps: [ GlobalService ], 
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
