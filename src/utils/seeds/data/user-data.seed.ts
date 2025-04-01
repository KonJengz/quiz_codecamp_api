import { RoleEnum } from 'src/resources/users/domain/user.domain';
import { CreateUserDto } from 'src/resources/users/dto/create.dto';

const userData = {
  username: 'codecamp20',
  password: 'codecamp20',
  role: RoleEnum.Student,
};

const adminData = {
  username: 'admin1106',
  password: 'adminCodeCamp',
  role: RoleEnum.Admin,
};

function seedsUser() {
  const users: CreateUserDto[] = [];
  for (let i = 1; i <= 50; i++) {
    users.push({ ...userData, username: `${userData.username}_0${i}` });
  }

  return [...users, adminData];
}

export const userSeedsData: CreateUserDto[] = seedsUser();
