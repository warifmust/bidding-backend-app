import { IGeneralErrorShape } from 'src/shared/errors/errors.interface';
import { SchemaOptions } from '@nestjs/mongoose';

export const constructSwaggerErrorResponses = (
  errors: IGeneralErrorShape[],
) => {
  return {
    content: {
      'application/json': {
        examples: errors.reduce((examples, error) => {
          examples[error.message] = { value: error };
          return examples;
        }, {}),
      },
    },
  };
};

export const DefaultSchemaOptions: SchemaOptions = {
  timestamps: true,
  toObject: {
    transform(_, ret) {
      delete Object.assign(ret, { [`id`]: ret[`_id`] })[`_id`];
      sanitizeData(ret);
    },
  },
  toJSON: {
    transform(_, ret) {
      delete Object.assign(ret, { [`id`]: ret[`_id`] })[`_id`];
      sanitizeData(ret);
    },
    getters: true,
    virtuals: true,
    versionKey: false,
  },
};

const sanitizeData = (current, index?, prev?) => {
  if (current !== null && typeof current === 'object') {
    if (current.constructor.name === 'Decimal128') {
      prev[index] = Number(current.toString());
    } else if (current.constructor.name === 'ObjectID') {
      prev[index] = String(current);
    } else {
      Object.entries(current).forEach(([key, value]) =>
        sanitizeData(value, key, prev ? prev[index] : current),
      );
    }
  }
};
