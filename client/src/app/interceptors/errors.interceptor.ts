import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {

            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            default:
              console.log('Someting Went Wrong', 'Close');
              console.log(error);
              break;
          }
        }

        return throwError(error);
      })
    );
  }
}
