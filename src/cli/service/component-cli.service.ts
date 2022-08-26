import { validateComponentName } from "../../common/functions/validation";
import { ComponentCliParams } from "../data/component-creator-params";
import { InvalidComponentNameLogger } from "../logger/invalid-component-name.logger";
import { ComponentCliView } from "../view/component-cli.view";

export class ComponentCliService  {
  private componentCliView: ComponentCliView
  constructor() {
    this.componentCliView = new ComponentCliView();
  }

  async handler(componentCliParams: ComponentCliParams): Promise<boolean> {
    const promptedParams = await this.componentCliView.askforMissingParams(componentCliParams);
    this.validateParams(promptedParams);
    const formatedComponentsNames = this.formatComponentsNames(promptedParams);

    // TODO: invoke creator
    console.log(formatedComponentsNames)
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