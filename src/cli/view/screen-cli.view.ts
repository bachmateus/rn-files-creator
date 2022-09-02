import inquirer, { Answers } from 'inquirer';
import { validateComponentName } from '../../common/functions/validation';
import { ScreenCliParams } from '../data/creator-params';

export class ScreenCliView {
  async askforMissingParams(screenCliParams: ScreenCliParams): Promise<ScreenCliParams> {
    const questions: Answers[] = [];
    (screenCliParams.screens.length===0) && questions.push(this.screenNameQuestion())
    if(questions.length === 0) return screenCliParams;
    const userResponse = await inquirer.prompt(questions) 
    return {
      screens: [userResponse.screens]
    }
  }

  private screenNameQuestion(): Answers{
    return {
      type: 'input',
      name: 'screens',
      message: `What's the screen name?\n->`,
      validate: validateComponentName
    }
  }
}