import { routesTypesEnum } from "./args-cli-options"

export interface ComponentCliParams {
  components: string[]
}

export interface ScreenCliParams {
  screens: string[]
}

export interface RouteCliParams {
  route: string
  routeType: routesTypesEnum
}