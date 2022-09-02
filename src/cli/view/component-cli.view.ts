import inquirer, { Answers } from 'inquirer';
import { validateComponentName } from '../../common/functions/validation';
import { ComponentCliParams } from '../data/creator-params';

export class ComponentCliView {
  async askforMissingParams(componentCliParams: ComponentCliParams): Promise<ComponentCliParams> {
    const questions = [];
    (componentCliParams.components.length===0) && questions.push(this.componentNameQuestion())
    if(questions.length === 0) return componentCliParams;
    const userResponse = await inquirer.prompt(questions) 
    return {
      components: [userResponse.components]
    }
  }

  private componentNameQuestion(): Answers{
    return {
      type: 'input',
      name: 'components',
      message: `What's the component name?\n->`,
      validate: validateComponentName
    }
  }
}