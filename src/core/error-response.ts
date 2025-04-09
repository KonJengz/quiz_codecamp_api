import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorApiResponse {
  public message: string;
  public timestamps: string;

  constructor(message: string) {
    this.message = message;
    this.timestamps = new Date(Date.now()).toLocaleString();
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
          message ??
          'Bad Request due to malsyntax request body or invalid request.';
        break;
    }
    return new HttpException(
      new ErrorApiResponse(responseMessage),
      HttpStatus.BAD_REQUEST,
    );
  }

  public static unauthorized(message?: string | 'identifier'): HttpException {
    let responseMessage: string;
    switch (message) {
      case 'identifier':
        responseMessage = 'The identifier is invalid.';
        break;
      default:
        responseMessage = 'This request is unauthorized.';
    }

    return new HttpException(
      new ErrorApiResponse(responseMessage),
      HttpStatus.UNAUTHORIZED,
    );
  }

  /**
   *
   * @param {String | "ID"} message
   * @param {String} id
   * @param {String } type - The domain of the id such as "User", "Questions" or any domain
   * @returns {HttpException} error
   */
  public static notFound(message?: 'ID' | string, id?: string, type?: string) {
    let respMsg: string;

    switch (message) {
      case 'ID':
        let idMsg = id ? `: ${id}` : ' provided';
        if (type) {
          respMsg = `The ${type} ID${idMsg} could not be found on this server.`;
        } else {
          respMsg = `The ID${idMsg} could not be found on this server.`;
        }
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
