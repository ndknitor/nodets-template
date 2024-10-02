import {
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class MinFileSizeConstraint implements ValidatorConstraintInterface {
    async validate(file: Express.Multer.File, args: any) {
        const [minSize] = args.constraints;
        return file && file.size >= minSize;
    }

    defaultMessage(args: any) {
        const [minSize] = args.constraints;
        return `File is too small. Minimum size should be ${minSize} bytes.`;
    }
}

export function MinFileSize(minSize: number, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'minFileSize',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: MinFileSizeConstraint,
            constraints: [minSize],
        });
    };
}

@ValidatorConstraint({ async: true })
export class MaxFileSizeConstraint implements ValidatorConstraintInterface {
  async validate(file: Express.Multer.File, args: any) {
    const [maxSize] = args.constraints;
    return file && file.size <= maxSize;
  }

  defaultMessage(args: any) {
    const [maxSize] = args.constraints;
    return `File is too large. Maximum size allowed is ${maxSize} bytes.`;
  }
}

export function MaxFileSize(maxSize: number, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'maxFileSize',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: MaxFileSizeConstraint,
      constraints: [maxSize],
    });
  };
}