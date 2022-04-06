import { hashSync, compareSync } from 'bcryptjs';
import crypto from 'crypto';
import { UserInput } from '../db/models/user';

export const generateHash = (password: string, salt: number) => {
  return hashSync(password, salt);
};

export const compareHash = (password: string, hash: string) => {
  return compareSync(password, hash);
};

export const omitHash = (user: UserInput) => {
  const { passwordHash, ...userWithoutHash } = user;
  return userWithoutHash;
};

export const generateRandomToken = () => {
  const token = crypto.pseudoRandomBytes(48).toString('hex');
  return token;
}
