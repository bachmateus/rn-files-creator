import arg from 'arg';
import { argOptions } from '../../config/argOptions';
import { IArgsCliOptions } from '../data/args-cli-options';
import { CreatorType } from '../data/creator-list';
import { InvalidArgumentException } from '../exception/invalid-argument.exception';
import { UserPromptedArgsCliView } from '../view/user-prompted-args-cli.view';

export class UserPromptedArgsCliService {
  /**
   * return users params converted into an object
   * @param {string[]} rawArgs users prompted params 
   * @returns {IArgsCliOptions | undefined} an object with users prompted
   */
  async handleGetUserPromptedArgs(rawArgs: string[]): Promise<IArgsCliOptions | undefined>{
    try {
      const promptedRawArgs = this.getUserPromptedArgs(rawArgs);
      const usersArgs = this.convertRawArgsIntoCliOptions(promptedRawArgs);
      return await this.validateUsersArg(usersArgs)
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Tranform users command into arg 
   * @param {string[]} rawArgs users prompted params 
   * @returns {arg.Result<arg.Spec>} an arg object with the users params seperate by args  
   */
  getUserPromptedArgs(rawArgs: string[]): arg.Result<arg.Spec> {
    return arg(argOptions, { argv: rawArgs.slice(2) });
  }

  /**
   * convert users args from lib 'arg' to project options
   * @param {args:arg.Result<arg.Spec>} args an arg object with the users params seperate by args  
   * @returns {IArgsCliOptions} a converted object with the users args 
   */
  convertRawArgsIntoCliOptions(args:arg.Result<arg.Spec>): IArgsCliOptions {
    return {
      isHelp: args['-h'] || false,
      component: args['-c'] || undefined,
      screen: args['-s'] || undefined,
      navigator: args['-n'] || undefined,
      navigatorsType: args['-t'] || undefined,
      includeOn: args['-i'] || undefined,
    }
  }
  /**
   * check if object with the user args is not empty. If empty, it call view to get the args. 
   * @param {IArgsCliOptions} usersArgs an object with the arg that the user typed
   * @returns {IArgsCliOptions} an object with the arg that the user typed
   */
  async validateUsersArg(usersArgs: IArgsCliOptions): Promise<IArgsCliOptions> {
    const {isHelp, component, screen, navigator} = usersArgs;
    const haveACreator = [component, screen, navigator].some(item=>item) 
    if (haveACreator) return usersArgs;
    if (isHelp) return usersArgs;
    const userPromptedArgsCliView = new UserPromptedArgsCliView();
    const creator = await userPromptedArgsCliView.askForMissingParams() as CreatorType;
    usersArgs[creator] = [];
    return usersArgs
  }

  /**
   * handle with error
   * @param error 
   */
  handleError(error: any): void {
    console.log(error)
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