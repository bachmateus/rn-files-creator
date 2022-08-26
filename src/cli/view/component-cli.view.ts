import inquirer, { Answers } from 'inquirer';
import { validateComponentName } from '../../common/functions/validation';
import { ComponentCliParams } from '../data/component-creator-params';

export class ComponentCliView {
  async askforMissingParams(componentCliParams: ComponentCliParams): Promise<ComponentCliParams> {
    const questions = [];
    (componentCliParams.components.length===0) && questions.push(this.componentNameQuestion())
    if(questions.length === 0) return componentCliParams;
    return await inquirer.prompt(questions)
  }

  private componentNameQuestion(): Answers{
    return {
      type: 'input',
      name: 'components',
      message: `What's the component name?\n->`,
      default: "MyComponent", 
      validate: validateComponentName
    }
  }
}