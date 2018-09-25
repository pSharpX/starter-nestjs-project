import {registerDecorator, ValidationOptions} from 'class-validator';
import {IsUserAlreadyExistConstraint} from '../is-user-already-exist-constraint';

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint,
        });
    };
}