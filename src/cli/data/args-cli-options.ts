/**
 * interface that contains the users args prompted
 */
export interface IArgsCliOptions {
  isHelp: boolean
  component: string[] | undefined
  screen: string[] | undefined
  route: string | undefined
  routeType: routesTypesEnum | undefined
  includeOn: string[] | undefined
}

/**
 * enum with the availables route types
 */
export enum routesTypesEnum {
  stack = "stack",
  bottomTab = "bottomTab",
  drawer = "drawer",
}