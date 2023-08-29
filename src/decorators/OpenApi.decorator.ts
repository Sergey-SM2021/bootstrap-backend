import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

export function OpenApi(
  action: string,
  tegs: string,
  withAuth: boolean = true,
) {
  if (withAuth) {
    return applyDecorators(
      ApiOperation({ summary: action }),
      ApiTags(tegs),
      ApiBearerAuth(),
    );
  }
  return applyDecorators(ApiOperation({ summary: action }), ApiTags(tegs));
}
