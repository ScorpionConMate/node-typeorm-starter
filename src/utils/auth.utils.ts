import { Response } from 'express';
import { check, ValidationChain } from 'express-validator';
import sha256 from 'sha256';
import { errors } from './error.utils';

export const generateHashedPassword = (password: string): string => sha256(password);

export function generateServerErrorCode(
  res: Response,
  code: number,
  fullError: string | string[],
  msg: string | string[],
  location = 'server',
): void {
  const err = {};
  err[location] = {
    fullError,
    msg,
  };
  res.status(code).json({
    code,
    fullError,
    err,
  });
}

// ================================
// Validation:
// Handle all validation check for the server
// ================================
export const registerValidation: ValidationChain[] = [
  check('email')
    .exists()
    .withMessage(errors.VALIDATION.EMAIL_IS_EMPTY)
    .isEmail()
    .withMessage(errors.VALIDATION.EMAIL_IS_IN_WRONG_FORMAT),
  check('password')
    .exists()
    .withMessage(errors.VALIDATION.PASSWORD_IS_EMPTY)
    .isLength({ min: 8 })
    .withMessage(errors.VALIDATION.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
];

export const loginValidation: ValidationChain[] = [
  check('email')
    .exists()
    .withMessage(errors.VALIDATION.EMAIL_IS_EMPTY)
    .isEmail()
    .withMessage(errors.VALIDATION.EMAIL_IS_IN_WRONG_FORMAT),
  check('password')
    .exists()
    .withMessage(errors.VALIDATION.PASSWORD_IS_EMPTY)
    .isLength({ min: 8 })
    .withMessage(errors.VALIDATION.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
];
