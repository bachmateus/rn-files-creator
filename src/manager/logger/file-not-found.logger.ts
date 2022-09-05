import { loggerType, PromptLoggerProps } from "../../common/data/prompt-logger-props";
import { PromptLogger } from "../../common/logger/prompt-logger";

export class FileNotFoundException {
  constructor(filePath:string){
    const promptLoggerProps: PromptLoggerProps = {
      message: `File ${filePath} was not found`,
      loggerType: loggerType.WARN,
      interruptProcess: false
    }
    
    new PromptLogger(promptLoggerProps);
  }
}