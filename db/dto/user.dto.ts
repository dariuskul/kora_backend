import { ERoles } from '../../constants/user';

export type CreateUserDTO = {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  role: keyof typeof ERoles;
  verificationToken?: string;
  status?: string
  notifyAfter?: number;
};

export type UpdateUserDTO = Partial<CreateUserDTO>;

export type AuthenticateDTO = {
  email: string;
  password: string;
}
