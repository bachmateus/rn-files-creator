import inquirer, { Answers} from 'inquirer';
import { RnFilesCreatorConfigFile } from '../data/rn-files-creator-config-file';

export class RnFilesCreatorConfigFileView {
  async askforMissingParams(configFile: RnFilesCreatorConfigFile) {
    const questions = [];
    !(configFile.language) && questions.push(this.languageQuestion())
    !(configFile.styleType) && questions.push(this.styleQuestion())
    if(questions.length === 0) return configFile;
    return await inquirer.prompt(questions)
  }

  private languageQuestion(): Answers{
    return {
      type: 'list',
      name: 'language',
      message: 'Do you wanna create in which language?',
      choices: ['JavaScript', 'TypeScript'],
      default:'JavaScript',
    }
  }

  private styleQuestion(): Answers {
    return {
      type: 'list',
      name: 'styleType',
      message: 'How will you style your components?',
      choices: ['styled-component', 'StyleSheet'],
      default:'styled-component',
    }
  }
}