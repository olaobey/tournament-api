import { ValidatorConstraintInterface } from 'class-validator';
export declare class IsPowerOfTwo implements ValidatorConstraintInterface {
    validate(value: number): boolean;
    defaultMessage(): string;
}
