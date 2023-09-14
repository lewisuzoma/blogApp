import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GlobalService } from '../services/core/global.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private global: GlobalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.global.spinner.show();

    return next.handle(request).pipe(
      finalize(
        () => {
          this.global.spinner.hide();
        }
      )
    )
  }
}
