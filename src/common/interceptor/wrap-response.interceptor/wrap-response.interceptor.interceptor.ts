import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before');

    // return next.handle().pipe(
    //   tap((data) => {
    //     console.log('Afterr', data);
    //   }),
    // );

    return next.handle().pipe(map((data) => ({ data })));
  }
}
