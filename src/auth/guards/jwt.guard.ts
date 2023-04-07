import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        console.log("Requseted Details : ", request.body , request.url , request.method );
        const requestedUrl = ['/auth/login', '/user/signup'];

        for (let i = 0; i < requestedUrl.length; i++) {
            if (request.url == requestedUrl[i]) return true;
        }

        return super.canActivate(context);
    }
}