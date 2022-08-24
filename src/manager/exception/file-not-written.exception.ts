import { exceptionType, PromptExeptionProps } from "../../common/data/prompt-exception-props";
import { PromptExeption } from "../../common/excection/prompt-exeption";

export class FileNotWrittenException {
  constructor(filePath:string){
    const promptExeptionProps: PromptExeptionProps = {
      message: `File ${filePath} was not written`,
      exceptionType: exceptionType.ERROR,
      interruptProcess: false
    }
    
    new PromptExeption(promptExeptionProps);
  }
}