import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorApiResponse {
  public message: string;
  public timeStamps: string;

  constructor(message: string) {
    this.message = message;
    this.timeStamps = Date.now().toLocaleString();
  }

  public static notFound(message?: string) {
    const respMsg =
      message ?? 'The requested resource can not be found on this server.';

    return new HttpException(
      new ErrorApiResponse(respMsg),
      HttpStatus.NOT_FOUND,
    );
  }

  public static badRequest(message?: string) {
    const responseMessage =
      message ??
      'Bad Request due to malsyntax request body or invalid request.';
    return new HttpException(
      new ErrorApiResponse(responseMessage),
      HttpStatus.BAD_REQUEST,
    );
  }

  public static conflictRequest(message?: string) {
    const respMsg =
      message ??
      'The request has a logical conflict. Please re-send it with resolved conflict.';
    return new HttpException(
      new ErrorApiResponse(respMsg),
      HttpStatus.CONFLICT,
    );
  }

  public static internalServerError(message?: string) {
    const responseMessage =
      message || 'Sorry. There is an internal server error issues.';
    return new HttpException(
      new ErrorApiResponse(responseMessage),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
