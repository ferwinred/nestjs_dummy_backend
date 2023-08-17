import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/index';

export const ROLES_KEY = 'roles';
export const Roles = (role: Role[] | Role) => SetMetadata(ROLES_KEY, role)