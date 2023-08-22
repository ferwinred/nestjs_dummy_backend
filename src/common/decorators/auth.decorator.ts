import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common"

import { ROLES_KEY } from "./roles.decorator"
import { Role } from "../../common/enums"
import { AuthGuard } from "../guards/auth.guard"
import { RolesGuard } from "../guards/roles.guard"

export const Auth = (...roles: Role[]) => {
    
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        UseGuards(AuthGuard, RolesGuard),
    )
}