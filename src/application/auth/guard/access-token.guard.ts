import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayloadType } from 'src/common/types/payload.type';
import { AllConfigEnum } from 'src/config/types/all-config.type';
import { AuthConfig } from 'src/config/types/auth-config.type';
import { ErrorApiResponse } from 'src/core/error-response';
import { RoleEnum } from 'src/resources/users/domain/user.domain';
import { AuthService } from '../auth.service';

@Injectable()
export class AccessTokenAuthGuard implements CanActivate {
  private logger: Logger = new Logger(AccessTokenAuthGuard.name);

  constructor(
    @Inject(JwtService)
    private jwtService: JwtService,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractJWTFromHeaders(request);

    if (!token) throw ErrorApiResponse.unauthorized();
    try {
      const payload: JwtPayloadType = this.jwtService.verify(token, {
        secret: this.configService.getOrThrow<AuthConfig>(
          `${AllConfigEnum.Auth}.accessTokenSecret`,
          { infer: true },
        ),
      });

      const { userId } = request.params;

      const isUserExist = await this.authService.validateUser(payload.sub);

      if (!isUserExist) throw ErrorApiResponse.unauthorized('identifier');

      if (userId && userId !== payload.sub) {
        if (payload.role !== RoleEnum.Admin)
          throw ErrorApiResponse.unauthorized();
      }

      request['user'] = { userId: payload.sub, role: payload.role };
    } catch (err) {
      this.logger.error(
        `Request could not be proceed due to the Error : ${err.message}`,
      );
      throw ErrorApiResponse.unauthorized(err.message);
    }

    return true;
  }

  private extractJWTFromHeaders(req: Request): string {
    const [type, token] = req.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
