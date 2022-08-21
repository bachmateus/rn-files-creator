import chalk from "chalk";
import { exceptionType, PromptExeptionProps } from "../data/prompt-exception-props";

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
    const chalkPromtColor = this.exceptionType === exceptionType.ERROR ? chalk.red.bold(exceptionType.ERROR) : chalk.yellow.bold(exceptionType.WARN)
    console.error(chalkPromtColor, this.message);
    if (this.interruptProcess) process.exit();
  }
  
}