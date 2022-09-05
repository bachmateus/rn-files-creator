import { loggerType, PromptLoggerProps } from "../../common/data/prompt-logger-props";
import { PromptLogger } from "../../common/logger/prompt-logger";

export class ErrorFileCreated {
  constructor(filePath:string){
    const promptLoggerProps: PromptLoggerProps = {
      message: filePath,
      loggerType: loggerType.ERROR,
      interruptProcess: false
    }
    
    new PromptLogger(promptLoggerProps);
  }
}