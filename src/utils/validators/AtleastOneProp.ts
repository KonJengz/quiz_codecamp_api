import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false, name: 'AtleastOneProperty' })
export class AtleastOnePropertyConstraint
  implements ValidatorConstraintInterface
{
  validate(_: any, args?: ValidationArguments): Promise<boolean> | boolean {
    const properties = args.constraints[0] as string[];
    const object = args.object as Function;

    return properties.some((prop) => {
      const value = object[prop];
      return !!value;
    });
  }

  defaultMessage(args?: ValidationArguments): string {
    const properties = args.constraints[0] as string[];
    return `At least one property is required : ${properties.join(', ')}`;
  }
}

export function AtleastOneProperty(props: string[]) {
  return function (constructor: Function) {
    registerDecorator({
      target: constructor,
      name: 'AtleastOneProperty',
      validator: AtleastOnePropertyConstraint,
      constraints: [props],
      propertyName: '__class__',
    });
  };
}
