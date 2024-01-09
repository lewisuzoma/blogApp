import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { finalize, catchError, map, tap, filter } from 'rxjs/operators';
import { GlobalService } from '../services/core/global.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private global: GlobalService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.global.spinner.show();
    this.global.loading.next(true);
    let headers: { [key: string]: string } = {
      'content-type': 'application/json',
      'realm': 'default',
    }

    if(true) headers['Authorization'] = `Bearer dfhdjfhdf`
    
    const modifiedReq = request.clone({
      setHeaders: headers
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP errors here
        if (error instanceof HttpErrorResponse) this.handleHttpError(error);
        return throwError(() => (error)); // Re-throw the error to propagate it further
      }),
      finalize(
        () => {
          this.global.spinner.hide();
          this.global.loading.next(false);
        }
      )
    )
  }

  private handleHttpError(error: HttpErrorResponse) {
    // Handle specific HTTP errors or global error handling here
    if (error.status === 401) {
       401
      // Handle Unauthorized error (e.g., redirect to login)
    } else if (error.status === 403) {
      // Handle Forbidden error
    } else {
      // Handle other HTTP errors (e.g., display a generic error message)
      console.error('HTTP error:', error);
      this.global.alertType.next('danger');
      this.global.alertMessage.next(error.message || 'An error occurred while processing your request.');
    }
  }
}

