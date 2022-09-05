/**
 * interface that contains the users args prompted
 */
export interface IArgsCliOptions {
  isHelp: boolean
  component: string[] | undefined
  screen: string[] | undefined
  navigator: string[] | undefined
  navigatorsType: navigatorsTypesEnum | undefined
  includeOn: string[] | undefined
}

/**
 * enum with the availables navigator
 */
export enum navigatorsTypesEnum {
  stack = "stack",
  bottomTab = "bottomTab",
  drawer = "drawer",
}