import { ComponentBuilderService } from "../../builder/service/component-builder.service";
import { validateComponentName } from "../../common/functions/validation";
import { ComponentCliParams } from "../data/component-creator-params";
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
    const formatedComponentsNames = this.formatComponentsNames(promptedParams);
    await this.componentBuilderService.handle(formatedComponentsNames.components, projectConfig)
    return true;
  }

  private validateParams(componentCliParams: ComponentCliParams) {
    const invalidComponentsName = componentCliParams.components.filter(param => !validateComponentName(param));
    if (invalidComponentsName.length>0) new InvalidComponentNameLogger(invalidComponentsName);
  }

  private formatComponentsNames(componentCliParams: ComponentCliParams): ComponentCliParams {
    return {
      components: componentCliParams.components.map( componentName => {
      const splitedName = componentName.split('-');
      const compositeName = splitedName.reduce( (response, name) => response + name.substring(0,1).toUpperCase() + name.substring(1), '');
      return compositeName
    })};
  }

}