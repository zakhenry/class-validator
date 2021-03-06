import {registerDecorator} from "../../src/index";
import {ValidationOptions} from "../../src/decorator/ValidationOptions";
import {ValidatorConstraintInterface} from "../../src/validation/ValidatorConstraintInterface";
import {ValidatorConstraint} from "../../src/decorator/decorators";
import {ValidationArguments} from "../../src/validation/ValidationArguments";

export function IsLongerThen(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator(object, propertyName, validationOptions, [property], IsLongerThenConstraint);
    };
}

@ValidatorConstraint("is_longer_then")
export class IsLongerThenConstraint implements ValidatorConstraintInterface {
    
    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return  typeof value === "string" && 
                typeof relatedValue === "string" && 
                value.length > relatedValue.length;
    }
    
}