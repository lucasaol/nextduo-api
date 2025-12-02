import { isUUID, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function RankIdsValidator(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'RankIdsRequireGameId',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const dto: any = args.object;
          if (value == null) {
            return true;
          }

          if (!dto.game_id) {
            return false;
          }

          if (!Array.isArray(value) || value.length === 0) {
            return false;
          }

          return (value.every((id: string) => isUUID(id, '4')));
        },

        defaultMessage(args: ValidationArguments) {
          const dto: any = args.object;
          if (dto.rank_ids && !dto.game_id) {
            return 'Rank IDs cannot be provided without game ID';
          }
          return 'rank_ids must be a non-empty array of valid UUIDs';
        }
      }
    });
  }
}