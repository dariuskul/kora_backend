import { CreateUserDTO } from '../../db/dto/user.dto';

export const validateUserInput = (payload: CreateUserDTO) => {
  const { dateOfBirth, email, fullName, password, role } = payload;
  if (!dateOfBirth || !email || !fullName || !password || !role) {
    return false;
  }

  return true;
};
