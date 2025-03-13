import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      id: request.user.id,
      name: request.user.name,
      email: request.user.email,
      isActive: request.user.isActive,
      role: request.user.role
    };
  },
);
