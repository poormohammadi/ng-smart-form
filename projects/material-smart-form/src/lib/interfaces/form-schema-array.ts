import { FormSchemaItem } from './form-schema-item';

export interface FormSchemaArray {
  [key: string]: { [key: string]: FormSchemaItem }[];
}
