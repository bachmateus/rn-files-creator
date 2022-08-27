import chalk from "chalk";

export interface PromptLoggerProps {
  message: string
  interruptProcess?: boolean
  loggerType: loggerType
}

export enum loggerType {
  WARN = 'WARN',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE'
}

export class LoggerColor {
  static WARN = chalk.yellow.bold('WARN');
  static ERROR = chalk.red.bold('ERROR');
  static SUCCESS = chalk.green.bold('SUCCESS');
  static CREATE = chalk.green.bold('CREATE');
  static UPDATE = chalk.blue.bold('UPDATE');
}