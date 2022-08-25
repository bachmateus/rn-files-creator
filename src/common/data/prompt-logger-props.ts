import chalk from "chalk";

export interface PromptLoggerProps {
  message: string
  interruptProcess?: boolean
  loggerType: loggerType
}

export enum loggerType {
  WARN = 'WARN',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export class LoggerColor {
  static WARN = chalk.red.bold('WARN');
  static ERROR = chalk.red.bold('ERROR');
  static SUCCESS = chalk.red.bold('SUCCESS');
}