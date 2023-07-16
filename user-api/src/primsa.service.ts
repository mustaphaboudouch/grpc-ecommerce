import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserRole } from './stubs/user/message';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    this.$use(async (params, next) => {
      if (
        params.model === 'User' &&
        ['create', 'update'].includes(params.action) &&
        params.args.data.password
      ) {
        const user = params.args.data;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        params.args.data = user;
      }
      return next(params);
    });
    this.$use(async (params, next) => {
      const result = await next(params);
      if (params.model !== 'User') return result;

      const mapToProto = (result) => {
        if (
          params?.model === 'User' &&
          params?.args?.select?.password !== true
        ) {
          delete result.password;
        }
        result.id = result.id + '';

        switch (result.role) {
          case Role.BASIC:
            result.role = UserRole.USER_ROLE_BASIC;
            break;
          case Role.ADMIN:
            result.role = UserRole.USER_ROLE_ADMIN;
            break;

          default:
            result.role = UserRole.USER_ROLE_BASIC;
            break;
        }

        return result;
      };
      if (!result) {
        return result;
      }
      if (result?.length > -1) {
        return result.map(mapToProto);
      }
      return mapToProto(result);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
