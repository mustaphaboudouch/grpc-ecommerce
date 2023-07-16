import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/stubs/user/message';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
