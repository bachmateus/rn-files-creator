import { loggerType, PromptLoggerProps } from "../../common/data/prompt-logger-props";
import { PromptLogger } from "../../common/logger/prompt-logger";

export class InvalidComponentNameLogger {
  constructor(componentsName: string[]){
    const promptLoggerProps: PromptLoggerProps = {
      message: `Invalid component name: ${componentsName.toString()}.`,
      loggerType: loggerType.ERROR,
      interruptProcess: true
    }
    
    new PromptLogger(promptLoggerProps);
  }
}