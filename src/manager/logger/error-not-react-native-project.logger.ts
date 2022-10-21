import { loggerType, PromptLoggerProps } from "../../common/data/prompt-logger-props";
import { PromptLogger } from "../../common/logger/prompt-logger";

export class ErrorNotReactNativeProjectLogger {
  constructor(){
    const promptLoggerProps: PromptLoggerProps = {
      message: 'The CLI must be run in the root of a React Native project',
      loggerType: loggerType.ERROR,
      interruptProcess: true
    }
    
    new PromptLogger(promptLoggerProps);
  }
}