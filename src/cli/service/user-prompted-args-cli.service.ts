import arg from 'arg';
import { argOptions } from '../../config/argOptions';
import { IArgsCliOptions } from '../data/args-cli-options';
import { InvalidArgumentException } from '../exception/invalid-argument.exception';

export class UserPromptedArgsCliService {
  /**
   * return users params converted into an object
   * @param {string[]} rawArgs users prompted params 
   * @returns {IArgsCliOptions | undefined} an object with users prompted
   */
  getUserPromptedArgs(rawArgs: string[]): IArgsCliOptions | undefined{
    try {
      const promptedRawArgs = this.validatePromptedArgs(rawArgs);
      return this.convertArgsIntoCliOptions(promptedRawArgs);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Validate if users arg is valid
   * @param {string[]} rawArgs users prompted params 
   * @returns {arg.Result<arg.Spec>} an arg object with the users params seperate by args  
   */
  validatePromptedArgs(rawArgs: string[]): arg.Result<arg.Spec> {
    return arg(argOptions, { argv: rawArgs.slice(2) });
  }

  /**
   * convert users args from lib 'arg' to project options
   * @param {args:arg.Result<arg.Spec>} args an arg object with the users params seperate by args  
   * @returns {IArgsCliOptions} a converted object with the users args 
   */
  convertArgsIntoCliOptions(args:arg.Result<arg.Spec>): IArgsCliOptions {
    return {
      isHelp: args['-h'] || false,
      components: args['-c'] || undefined,
      screens: args['-s'] || undefined,
      navigators: args['-n'] || undefined,
      navigatorsTypes: args['-t'] || undefined,
      includeOn: args['-i'] || undefined,
    }
  }

  /**
   * handle with error
   * @param error 
   */
  handleError(error: any): void {
    new InvalidArgumentException();

    // // TODO: show which arg got an error
    // if(error.code === 'ARG_UNKNOWN_OPTION')
    //   throw new InvalidArgumentException()

    // if(error.code === 'ARG_MISSING_REQUIRED_SHORTARG')
    //   throw new InvalidArgumentException()
      
    // if(error.code === 'ARG_MISSING_REQUIRED_LONGARG')
    //   throw new InvalidArgumentException()
    //   // throw new Error('No value have been passed to one arg')

    // throw new Error("Unhandled error");
    
  }
}