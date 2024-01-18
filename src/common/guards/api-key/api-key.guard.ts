import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorators';

@Injectable()
// Validate the presence of API keys on routes that are not declared public
export class ApiKeyGuard implements CanActivate {
  // Enables us to look at the metaData
  constructor( 
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) {
      return true;
    }

    // Gives us access to the native request, next and response object
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const authHeader = request.header('Authorization');

    return authHeader === this.configService.get('API_KEY');
  }
}
