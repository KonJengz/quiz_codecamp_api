import { isString } from 'class-validator';
import { ErrorApiResponse } from 'src/core/error-response';

export function IDValidator(id: string, type: string) {
  if (!id || !isString(id))
    throw ErrorApiResponse.badRequest(
      `The ${type} ID: ${id} is not valid. Please try again.`,
    );
}
