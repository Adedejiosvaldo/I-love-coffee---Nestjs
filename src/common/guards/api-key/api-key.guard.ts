import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
// Validate the presence of API keys on routes that are not declared public
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Gives us access to the native request, next and response object
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const authHeader = request.header('Authorization');

    return authHeader === process.env.API_KEY;
  }
}
