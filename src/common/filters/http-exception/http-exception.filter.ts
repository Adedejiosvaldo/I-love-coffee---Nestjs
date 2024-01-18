import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    // Gives us access to the native inflight object
    const ctx = host.switchToHttp();
    // The response we will be sending back
    const response = ctx.getResponse<Response>();
    // Status code of request
    const status = exception.getStatus();

    // The exception response
    const exceptionResponse = exception.getResponse();

    //
    const error =
      // Checks if the response is a string or an object -
      // If it is an object -- do nothing but if it is a
      // String -- create an object
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    response
      .status(status)
      .json({ ...error, timeStamp: new Date().toISOString() });
  }
}
