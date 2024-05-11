import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { UserType } from '../types';
import { settings } from '../settings';

export const jwtService = {
  createJWT: (user: UserType) => {
    const token = jwt.sign({ userId: user._id }, settings.JWT_SECRET, {
      expiresIn: '1h',
    });
    return token;
  },
  getUserIdByToken: (token: string) => {
    try {
      const result: any = jwt.verify(token, settings.JWT_SECRET);

      return ObjectId.createFromHexString(result.userId);
    } catch (_) {
      return null;
    }
  },
};
