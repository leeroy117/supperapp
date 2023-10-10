import { ApikeyService } from './apikey.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/public_access';

@Injectable()
export class ApikeyGuard implements CanActivate {

  constructor(private apiKeyService: ApikeyService, private reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
    
  ): boolean | Promise<boolean> | Observable<boolean> {

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request  = context.switchToHttp().getRequest();
    const apiKey = this.extractApiKeyFromHeader(request);
    console.log("🚀 ~ file: apikey.guard.ts:18 ~ ApikeyGuard ~ apiKey:", apiKey)

    if (typeof apiKey == 'undefined') {
      return false;
    }
    
    return this.apiKeyService.get(apiKey); 
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    return request.headers['ag-api-key'];
  }

  

}
