import { NotParentFormSchemaItem } from './not-parent-form-schema-item';

export interface ParentFormSchemaItem {
  [key: string]: NotParentFormSchemaItem;
}
