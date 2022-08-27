import { loggerType, PromptLoggerProps } from "../../common/data/prompt-logger-props";
import { PromptLogger } from "../../common/logger/prompt-logger";

export class ComponentAlreadyExistsLogger {
  constructor(componentName:string){
    const promptLoggerProps: PromptLoggerProps = {
      message: `${componentName} already exists`,
      loggerType: loggerType.ERROR,
      interruptProcess: false
    }
    
    new PromptLogger(promptLoggerProps);
  }
}