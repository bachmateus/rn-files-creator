import { RnFilesCreatorConfigFile } from "../data/rn-files-creator-config-file";
import { RouteCliView } from "../view/route-cli.view";
import { RouteCliParams } from '../data/creator-params';
import { formatComponentName, validateComponentName } from "../../common/functions/validation";
import { InvalidComponentNameLogger } from "../logger/invalid-component-name.logger";
import { routesTypesEnum } from '../data/args-cli-options';
import { RouteBuilderService } from "../../builder/service/route-builder.service";

export class RouteCliService {
  private routeCliParams: RouteCliParams = {} as RouteCliParams 

  constructor(
    private readonly routeCliView: RouteCliView,
    private readonly routeBuilderService: RouteBuilderService,
  ){}

  async handler(routeCliParams: RouteCliParams, projectConfig: RnFilesCreatorConfigFile): Promise<boolean> {
    this.routeCliParams = routeCliParams;
    this.validateRouteType()
    this.routeCliParams = await this.routeCliView.askForMissingParams(this.routeCliParams);
    this.validateRouteName();

    await this.routeBuilderService.handle(this.routeCliParams, projectConfig);
    return true; 
  }
  
  private validateRouteType() {
    if (!Object.values(routesTypesEnum).includes(this.routeCliParams.routeType))
      this.routeCliParams.routeType = '' as routesTypesEnum;
  }

  private validateRouteName() {
    const validComponentsName = validateComponentName(this.routeCliParams.route);
    if (!validComponentsName) new InvalidComponentNameLogger([this.routeCliParams.route]);
    this.routeCliParams.route = formatComponentName(this.routeCliParams.route);
    if (this.routeCliParams.route.indexOf('Route') === -1) this.routeCliParams.route = `${this.routeCliParams.route}Routes`;
    // TODO: create an specific message for this case
    if (this.routeCliParams.route==='Route'||this.routeCliParams.route==='Routes') new InvalidComponentNameLogger([this.routeCliParams.route]);
  }
}