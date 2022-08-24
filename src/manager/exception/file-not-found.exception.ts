import { exceptionType, PromptExeptionProps } from "../../common/data/prompt-exception-props";
import { PromptExeption } from "../../common/excection/prompt-exeption";

export class FileNotFoundException {
  constructor(filePath:string){
    const promptExeptionProps: PromptExeptionProps = {
      message: `File ${filePath} was not found`,
      exceptionType: exceptionType.WARN,
      interruptProcess: false
    }
    
    new PromptExeption(promptExeptionProps);
  }
}