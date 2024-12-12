import { JSXElementConstructor } from "react";

export type SetOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type ValueOf<T> = T[keyof T];

export type Nullable<T> = T | null;

export type Nilable<T> = T | null | undefined;

export type OmitPropsOf<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  K extends keyof React.ComponentProps<T>,
> = Omit<React.ComponentProps<T>, K>;
