import { loggerType, PromptLoggerProps } from "../../common/data/prompt-logger-props";
import { PromptLogger } from "../../common/logger/prompt-logger";

export class SuccessFileUpdated {
  constructor(filePath:string){
    const promptLoggerProps: PromptLoggerProps = {
      message: filePath,
      loggerType: loggerType.UPDATE,
      interruptProcess: false
    }
    
    new PromptLogger(promptLoggerProps);
  }
}