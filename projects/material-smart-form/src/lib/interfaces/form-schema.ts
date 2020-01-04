import { ParentFormSchemaItem } from './parent-form-schema-item';

import { NotParentFormSchemaItem } from './not-parent-form-schema-item';

import { FormSchemaArray } from './form-schema-array';

export type FormSchema = ParentFormSchemaItem  | NotParentFormSchemaItem  | FormSchemaArray;
