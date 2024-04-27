import { CrudTypes } from './constants';

// @todo: typesObject object'inin key type'ı string yerine daha doğru bir yol bul
export const crudTypesObjectToInt = (typesObject: { [type: string]: boolean }): number => {
  let value = 0;

  value += typesObject[CrudTypes.LIST] ? CrudTypes.LIST : 0;
  value += typesObject[CrudTypes.VIEW] ? CrudTypes.VIEW : 0;
  value += typesObject[CrudTypes.CREATE] ? CrudTypes.CREATE : 0;
  value += typesObject[CrudTypes.UPDATE] ? CrudTypes.UPDATE : 0;
  value += typesObject[CrudTypes.DELETE] ? CrudTypes.DELETE : 0;

  return value;
};

export const intToCrudTypesObject = (value: number): { [type: string]: boolean } => {
  return {
    [CrudTypes.LIST]: (value & CrudTypes.LIST) === CrudTypes.LIST,
    [CrudTypes.VIEW]: (value & CrudTypes.VIEW) === CrudTypes.VIEW,
    [CrudTypes.CREATE]: (value & CrudTypes.CREATE) === CrudTypes.CREATE,
    [CrudTypes.UPDATE]: (value & CrudTypes.UPDATE) === CrudTypes.UPDATE,
    [CrudTypes.DELETE]: (value & CrudTypes.DELETE) === CrudTypes.DELETE,
  };
};
