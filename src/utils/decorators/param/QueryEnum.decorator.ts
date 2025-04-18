import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ErrorApiResponse } from 'src/core/error-response';
import { EnumHelper, ObjectHelper } from 'src/utils/object.helper';

type QueryEnumDataPropsType = {
  queryStr: string;
  entity: Object;
};

export const QueryEnum = createParamDecorator(
  (data: QueryEnumDataPropsType, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    if (ObjectHelper.isEmpty(data)) return null;

    const { entity, queryStr } = data;

    const value = request.query[queryStr];

    if (!value) return null;

    const parsedValue = String(value).toUpperCase();

    if (!EnumHelper.isEnumValue(entity, parsedValue))
      throw ErrorApiResponse.badRequest(
        `The query for ${queryStr} does not provide correct type for Enum name: ${entity}`,
      );

    return entity[parsedValue];
  },
);
