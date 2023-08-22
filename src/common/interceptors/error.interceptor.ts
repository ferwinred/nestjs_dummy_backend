import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    BadGatewayException,
    CallHandler,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  


  @Injectable()
  export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next
        .handle()
        .pipe(
          catchError(err => {
            console.log(err.response);
            return throwError(() => this.handlerError(err.response))
        }),
        );
    }

    private handlerError(err: any): void {

        if (err.statusCode === 404) throw new NotFoundException(err.message)

        if (err.statusCode === 400) throw new BadRequestException(err.message)

        throw new BadGatewayException(err)
    }
  }
  