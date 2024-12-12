export type SetOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type ValueOf<T> = T[keyof T];

export type Nullable<T> = T | null;

export type Nilable<T> = T | null | undefined;
