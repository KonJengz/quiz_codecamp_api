export enum DomainQueryEnums {
  status = 's',
}

export enum DomainStatusEnums {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type DomainQueryTypes = {
  status?: DomainStatusEnums;
};
