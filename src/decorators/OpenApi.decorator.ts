import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

export function OpenApi(
  action: string,
  tags: string,
  withAuth: boolean = true,
) {
  if (withAuth) {
    return applyDecorators(
      ApiOperation({ summary: action }),
      ApiTags(tags),
      ApiBearerAuth(),
    );
  }
  return applyDecorators(ApiOperation({ summary: action }), ApiTags(tags));
}
