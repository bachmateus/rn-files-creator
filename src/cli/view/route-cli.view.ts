import inquirer, { Answers } from "inquirer";
import { RouteCliParams } from "../data/creator-params";
import { validateComponentName } from '../../common/functions/validation';
import { routesTypesEnum } from "../data/args-cli-options";

export class RouteCliView {
  async askForMissingParams(routeCliParams: RouteCliParams): Promise<RouteCliParams> {
    const questions: Answers = [];
    if(routeCliParams.route.length===0) questions.push(this.routeNameQuestion())
    if(routeCliParams.routeType.length===0) questions.push(this.routeTypeQuestion())
    if(questions.length === 0) return routeCliParams;
    const userResponse = await inquirer.prompt(questions) 
    return {
      route: (routeCliParams.route.length===0) ? userResponse.route : routeCliParams.route,
      routeType: (routeCliParams.routeType.length===0) ? userResponse.routeType : routeCliParams.routeType,
    }
  }

  private routeNameQuestion(): Answers {
    return {
      type: 'input',
      name: 'route',
      message: `What's the route name?\n->`,
      validate: validateComponentName
    }
  }

  private routeTypeQuestion(): Answers {
    return {
      type: 'list',
      name: 'routeType',
      message: 'What kind of route navigator do you want to create?',
      choices: Object.values(routesTypesEnum),
      default: routesTypesEnum.stack
    }
  }
}