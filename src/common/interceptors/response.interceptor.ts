
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

    const method = context.switchToHttp().getResponse().req.method
    
    const responses = {
        GET: 200,
        POST: 201,
        PATCH: 200,
        DELETE: 200,
    }

    return next.handle().pipe(map(data => ({ error: false, statusCode: responses[method], data })));
  }
}