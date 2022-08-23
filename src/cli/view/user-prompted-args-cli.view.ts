import inquirer from 'inquirer';
import { creatorList, CreatorType } from '../data/creator-list';

export class UserPromptedArgsCliView {
  async askForMissingParams(): Promise<CreatorType> {
    const userPrompted = await inquirer.prompt([{
        type: 'list',
        name: 'creator',
        message: 'What kind do you want to create?',
        choices: creatorList,
        default: creatorList[0]
    }]);
    return userPrompted.creator;
  }
}