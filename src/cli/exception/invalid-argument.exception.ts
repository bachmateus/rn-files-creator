import { exceptionType, PromptExeptionProps } from "../../common/data/prompt-exception-props";
import { PromptExeption } from "../../common/excection/prompt-exeption";

export class InvalidArgumentException {
  constructor(){
    const promptExeptionProps: PromptExeptionProps = {
      message: `Invalid argument or value was passed. Run 'rn -h' to see commands`,
      exceptionType: exceptionType.ERROR,
      interruptProcess: true
    }
    
    new PromptExeption(promptExeptionProps);
  }
}