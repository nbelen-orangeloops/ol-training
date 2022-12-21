import {CoreHelper} from "./CoreHelper";

export class ModelHelper {
  static validateFirstName(name: string): string[] {
    name = name.trim();
    const nameMax = 100;

    if (name.trim().length === 0) return [CoreHelper.formatMessage("Validation-emptyFieldError")];
    else if (name.length > nameMax) return [CoreHelper.formatMessage("Validation-inputMaxError", {max: nameMax})];

    return [];
  }

  static validateLastName = ModelHelper.validateFirstName;

  static validateEmail(email: string): string[] {
    email = email.trim();
    const pattern = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    if (email.trim().length === 0) return [CoreHelper.formatMessage("Validation-emptyFieldError")];
    else if (!pattern.test(email)) return [CoreHelper.formatMessage("Validation-emailInvalidError")];

    return [];
  }

  static validatePassword(password: string): string[] {
    return password.trim().length === 0 ? [CoreHelper.formatMessage("Validation-emptyFieldError")] : [];
  }
}
