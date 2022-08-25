import { LoggerColor, loggerType, PromptLoggerProps } from "../data/prompt-logger-props";

export class PromptLogger implements PromptLoggerProps{
  message: string;
  interruptProcess?: boolean | undefined;
  loggerType: loggerType;
  
  constructor({message, interruptProcess, loggerType}:PromptLoggerProps) {
    this.message = message;
    this.interruptProcess = interruptProcess;
    this.loggerType = loggerType
    this.handle();
  }

  handle() {
    console.log(LoggerColor[this.loggerType], this.message);
    if (this.interruptProcess) process.exit();
  }
  
}