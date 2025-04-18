import { isString } from 'class-validator';
import { isObjectIdOrHexString } from 'mongoose';
import { ErrorApiResponse } from 'src/core/error-response';

export function IDValidator(id: string, type: string) {
  if (!id || !isString(id))
    throw ErrorApiResponse.badRequest(
      `The ${type} ID: ${id} is not valid. Please try again.`,
    );

  if (!isObjectIdOrHexString(id))
    throw ErrorApiResponse.badRequest(
      `The ID: ${id} is not valid. Please try again.`,
    );
}
