import { ComponentBuilderService } from "../../builder/service/component-builder.service";
import { formatComponentsNames, validateComponentName } from "../../common/functions/validation";
import { ComponentCliParams } from "../data/creator-params";
import { RnFilesCreatorConfigFile } from "../data/rn-files-creator-config-file";
import { InvalidComponentNameLogger } from "../logger/invalid-component-name.logger";
import { ComponentCliView } from "../view/component-cli.view";

export class ComponentCliService  {
  constructor(
    private componentCliView: ComponentCliView,
    private componentBuilderService: ComponentBuilderService
  ) {}

  async handler(componentCliParams: ComponentCliParams, projectConfig: RnFilesCreatorConfigFile): Promise<boolean> {
    const promptedParams = await this.componentCliView.askforMissingParams(componentCliParams);
    this.validateParams(promptedParams);
    const formatedComponentsNames = formatComponentsNames(promptedParams.components);
    await this.componentBuilderService.handle(formatedComponentsNames, projectConfig)
    return true;
  }

  private validateParams(componentCliParams: ComponentCliParams) {
    const invalidComponentsName = componentCliParams.components.filter(param => !validateComponentName(param));
    if (invalidComponentsName.length>0) new InvalidComponentNameLogger(invalidComponentsName);
  }
}