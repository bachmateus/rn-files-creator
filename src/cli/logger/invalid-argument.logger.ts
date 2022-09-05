import { loggerType, PromptLoggerProps } from "../../common/data/prompt-logger-props";
import { PromptLogger } from "../../common/logger/prompt-logger";

export class InvalidArgumentException {
  constructor(){
    const promptLoggerProps: PromptLoggerProps = {
      message: `Invalid argument or value was passed. Run 'rn -h' to see commands`,
      loggerType: loggerType.ERROR,
      interruptProcess: true
    }
    
    new PromptLogger(promptLoggerProps);
  }
}