import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPowerOfTwo', async: false })
export class IsPowerOfTwo implements ValidatorConstraintInterface {
  validate(value: number) {
    if (value <= 0) {
      return false;
    }

    // A power of 2 has only one bit set to 1, so (value & (value - 1)) will be 0
    return (value & (value - 1)) === 0;
  }

  defaultMessage() {
    return 'Value must be a power of 2 (e.g., 2, 4, 8, 16, 32, 64, etc.)';
  }
}
