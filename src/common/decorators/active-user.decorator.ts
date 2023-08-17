import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const ActiveUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>{
        const request: RequestWithUser = ctx.switchToHttp().getRequest();
        return request.user;
})