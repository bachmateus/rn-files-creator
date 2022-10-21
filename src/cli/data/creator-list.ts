export const creatorList = ['component', 'screen', 'route'] as const;

type ElementType < T extends ReadonlyArray < unknown > > = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

export type CreatorType = ElementType<typeof creatorList> 