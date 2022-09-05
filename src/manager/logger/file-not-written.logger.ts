import { loggerType, PromptLoggerProps } from "../../common/data/prompt-logger-props";
import { PromptLogger } from "../../common/logger/prompt-logger";

export class FileNotWrittenException {
  constructor(filePath:string){
    const promptLoggerProps: PromptLoggerProps = {
      message: `File ${filePath} was not written`,
      loggerType: loggerType.ERROR,
      interruptProcess: false
    }
    
    new PromptLogger(promptLoggerProps);
  }
}