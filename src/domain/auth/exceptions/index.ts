import { HttpStatus } from '@nestjs/common';
import {
  BaseException,
  UNKNOWN_ERROR,
} from 'src/share/exceptions/BaseException';

const AuthExceptionError = {
  SIGNUP_USER_PHONE_REGISTERED: '10000',

  // SIGN_IN 에러 10100 ~
  SIGN_IN_USER_NOT_FOUND: '10100',
  SIGN_IN_PASSWORD_NOT_MATCH: '10101',

  // REFRESH_TOKEN 에러 10200 ~
  REFRESH_TOKEN_NOT_FOUND: '10200',
  REFRESH_TOKEN_USER_NOT_FOUND: '10201',
};

type AuthExceptionErrorCode = keyof typeof AuthExceptionError;

const AuthExceptionStatusCode: Record<AuthExceptionErrorCode, HttpStatus> = {
  SIGNUP_USER_PHONE_REGISTERED: HttpStatus.BAD_REQUEST,
  SIGN_IN_USER_NOT_FOUND: HttpStatus.NOT_FOUND,
  SIGN_IN_PASSWORD_NOT_MATCH: HttpStatus.BAD_REQUEST,

  REFRESH_TOKEN_NOT_FOUND: HttpStatus.NOT_FOUND,
  REFRESH_TOKEN_USER_NOT_FOUND: HttpStatus.NOT_FOUND,
};

export class AuthException extends BaseException {
  constructor(error: AuthExceptionErrorCode) {
    if (!AuthExceptionStatusCode[error]) {
      super('Unknown Error', HttpStatus.BAD_REQUEST, UNKNOWN_ERROR);
    }

    super(error, AuthExceptionStatusCode[error], AuthExceptionError[error], {
      prefix: 'AUTH',
    });
  }
}
