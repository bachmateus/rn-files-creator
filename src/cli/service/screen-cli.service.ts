import { ScreenBuilderService } from "../../builder/service/screen-builder.service";
import { formatComponentsNames, validateComponentName } from "../../common/functions/validation";
import { ScreenCliParams } from "../data/creator-params";
import { RnFilesCreatorConfigFile } from "../data/rn-files-creator-config-file";
import { InvalidComponentNameLogger } from "../logger/invalid-component-name.logger";
import { ScreenCliView } from "../view/screen-cli.view";

export class ScreenCliService  {
  constructor(
    private screenCliView: ScreenCliView,
    private screenBuilderService: ScreenBuilderService
  ) {}

  async handler(screenCliParams: ScreenCliParams, projectConfig: RnFilesCreatorConfigFile): Promise<boolean> {
    const promptedParams = await this.screenCliView.askforMissingParams(screenCliParams);
    this.validateParams(promptedParams);
    const formatedScreensNames = formatComponentsNames(promptedParams.screens);
    await this.screenBuilderService.handle(formatedScreensNames, projectConfig)
    return true;
  }

  private validateParams(screenCliParams: ScreenCliParams) {
    const invalidScreensName = screenCliParams.screens.filter(param => !validateComponentName(param));
    if (invalidScreensName.length>0) new InvalidComponentNameLogger(invalidScreensName);
  }
}