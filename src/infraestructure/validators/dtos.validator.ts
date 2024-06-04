import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Validator } from '../../application/validation/validators/validator.interface';

export class DtoValidator<T extends object> implements Validator<T> {
  private readonly type: new () => T;

  constructor(type: new () => T) {
    this.type = type;
  }

  public async validate(object: T): Promise<boolean> {
    try {
      await validateOrReject(plainToInstance(this.type, object));
      return true;
    } catch (error) {
      return false;
    }
  }
}
