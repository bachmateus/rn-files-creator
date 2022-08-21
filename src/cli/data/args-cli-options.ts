/**
 * interface that contains the users args prompted
 */
export interface IArgsCliOptions {
  isHelp: boolean
  components: string[] | undefined
  screens: string[] | undefined
  navigators: string[] | undefined
  navigatorsTypes: navigatorsTypesEnum | undefined
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