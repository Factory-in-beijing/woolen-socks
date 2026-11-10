declare const brand: unique symbol;

/** Nominal typing (principle 19): a `PrincipalId` can never be passed where a `WorkspaceId` is expected. */
export type Brand<T, B extends string> = T & { readonly [brand]: B };

/** Money in integer tetri (1 lari = 100 tetri). The one definition shared by API, i18n and clients (principle 10). */
export type Tetri = Brand<number, "Tetri">;
