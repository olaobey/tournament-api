"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPowerOfTwo = void 0;
const class_validator_1 = require("class-validator");
let IsPowerOfTwo = class IsPowerOfTwo {
    validate(value) {
        if (value <= 0) {
            return false;
        }
        return (value & (value - 1)) === 0;
    }
    defaultMessage() {
        return 'Value must be a power of 2 (e.g., 2, 4, 8, 16, 32, 64, etc.)';
    }
};
exports.IsPowerOfTwo = IsPowerOfTwo;
exports.IsPowerOfTwo = IsPowerOfTwo = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsPowerOfTwo', async: false })
], IsPowerOfTwo);
//# sourceMappingURL=power.validator.js.map