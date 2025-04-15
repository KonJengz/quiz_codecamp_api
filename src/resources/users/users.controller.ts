import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { userPath } from 'src/common/path';
import { UsersService } from './users.service';
import { AccessTokenAuthGuard } from 'src/application/auth/guard/access-token.guard';
import { ApiBearerAuth, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { HttpRequestWithUser } from 'src/common/types/http.type';
import {
  GetManyUsersResponse,
  GetMeResponse,
  GetUserByIdResponse,
} from './dto/get.dto';
import { AdminGuard } from 'src/application/auth/guard/admin.guard';
import { User } from './domain/user.domain';

@Controller({ version: '1', path: userPath.base })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: GetManyUsersResponse })
  @UseGuards(AccessTokenAuthGuard, AdminGuard)
  @Get()
  async getMany(): Promise<GetManyUsersResponse> {
    const allUsers = await this.userService.getMany();

    return GetManyUsersResponse.getSuccess(userPath.base, allUsers);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: GetMeResponse })
  @UseGuards(AccessTokenAuthGuard)
  @Get(userPath.me)
  async getMe(@Req() req: HttpRequestWithUser): Promise<GetMeResponse> {
    const myInfo = await this.userService.getById(req.user.userId);

    return GetMeResponse.getSuccess(userPath.me, myInfo);
  }

  @ApiBearerAuth()
  @ApiParam({ name: userPath.paramId, required: true })
  @ApiOkResponse({ type: GetUserByIdResponse })
  // @UseGuards(AccessTokenAuthGuard, AdminGuard)
  @Get(`:${userPath.paramId}`)
  async getById(
    @Param(userPath.paramId) id: User['id'],
  ): Promise<GetUserByIdResponse> {
    const user = await this.userService.getById(id);

    return GetUserByIdResponse.getSuccess(`${userPath.base}/${id}`, user);
  }
}
