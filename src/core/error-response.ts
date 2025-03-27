import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorApiResponse {
  public message: string;
  public timeStamps: string;

  constructor(message: string) {
    this.message = message;
    this.timeStamps = Date.now().toLocaleString();
  }

  public static notFound(message?: 'ID' | string, id?: string) {
    let respMsg: string;

    switch (message) {
      case 'ID':
        let idMsg = id ? `: ${id}` : ' provided';
        respMsg = `The ID${idMsg} could not be found on this server.`;
        break;
      default:
        respMsg = 'The requested resource could not be found on this server.';
        break;
    }

    return new HttpException(
      new ErrorApiResponse(respMsg),
      HttpStatus.NOT_FOUND,
    );
  }

  public static badRequest(message?: 'ID' | string, id?: string) {
    let responseMessage: string;

    switch (message) {
      case 'ID':
        let idMsg = id ? `: ${id}` : ' provided';
        responseMessage = `The ID${idMsg} is not  a valid type for the ID resources.`;
        break;
      default:
        responseMessage =
          'Bad Request due to malsyntax request body or invalid request.';
        break;
    }
    return new HttpException(
      new ErrorApiResponse(responseMessage),
      HttpStatus.BAD_REQUEST,
    );
  }

  public static conflictRequest(message?: 'ID' | string) {
    let respMsg =
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
