export const creatorList = ['component', 'screen', 'navigator'] as const;

type ElementType < T extends ReadonlyArray < unknown > > = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

export type CreatorType = ElementType<typeof creatorList> 