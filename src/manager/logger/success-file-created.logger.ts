import { loggerType, PromptLoggerProps } from "../../common/data/prompt-logger-props";
import { PromptLogger } from "../../common/logger/prompt-logger";

export class SuccessFileCreated {
  constructor(filePath:string){
    const promptLoggerProps: PromptLoggerProps = {
      message: filePath,
      loggerType: loggerType.CREATE,
      interruptProcess: false
    }
    
    new PromptLogger(promptLoggerProps);
  }
}