import { ApiProperty } from '@nestjs/swagger';
import { HTTPMethod } from 'src/common/types/http.type';

type CoreApiResponseConstructInput<T> = Omit<CoreApiResponse<T>, 'timestamps'>;

export class CoreApiResponse<T> {
  @ApiProperty({ type: String })
  public message: string;
  @ApiProperty({ type: String })
  public data: T;
  @ApiProperty({ type: String })
  public timestamps: string;
  constructor(input: CoreApiResponseConstructInput<T>) {
    const { data, message } = input;
    this.data = data;
    this.message = message;
    this.timestamps = new Date(Date.now()).toLocaleString();
  }

  public static getSuccess<T>(path: string, data: T): CoreApiResponse<T> {
    const message = `${HTTPMethod.GET} /${path} successfully`;
    return new CoreApiResponse<T>({ message, data });
  }

  public static postSuccess<T>(path: string, data: T): CoreApiResponse<T> {
    const message = `${HTTPMethod.POST} /${path} successfully`;
    return new CoreApiResponse<T>({ message, data });
  }

  public static patchSuccess<T>(path: string, data: T): CoreApiResponse<T> {
    const message = `${HTTPMethod.PATCH} /${path} successfully`;
    return new CoreApiResponse<T>({ message, data });
  }
  public static deleteSuccess(path: string): CoreApiResponse<null> {
    const message = `${HTTPMethod.PATCH} /${path} successfully`;
    return new CoreApiResponse<null>({ message, data: null });
  }
}
