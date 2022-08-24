import { ExcectionColorLog, exceptionType, PromptExeptionProps } from "../data/prompt-exception-props";

export class PromptExeption implements PromptExeptionProps{
  message: string;
  interruptProcess?: boolean | undefined;
  exceptionType: exceptionType;
  
  constructor({message, interruptProcess, exceptionType}:PromptExeptionProps) {
    this.message = message;
    this.interruptProcess = interruptProcess;
    this.exceptionType = exceptionType
    this.handle();
  }

  handle() {
    console.error(ExcectionColorLog[this.exceptionType], this.message);
    if (this.interruptProcess) process.exit();
  }
  
}