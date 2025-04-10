import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { userPath } from 'src/common/path';
import { UsersService } from './users.service';
import { AccessTokenAuthGuard } from 'src/application/auth/guard/access-token.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { HttpRequestWithUser } from 'src/common/types/http.type';
import { GetMeResponse } from './dto/get.dto';

@Controller({ version: '1', path: userPath.base })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: GetMeResponse })
  @UseGuards(AccessTokenAuthGuard)
  @Get(userPath.me)
  async getMe(@Req() req: HttpRequestWithUser): Promise<GetMeResponse> {
    const myInfo = await this.userService.getById(req.user.userId);

    return GetMeResponse.getSuccess(userPath.me, myInfo);
  }
}
