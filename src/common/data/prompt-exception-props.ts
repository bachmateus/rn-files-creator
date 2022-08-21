export interface PromptExeptionProps {
  message: string
  interruptProcess?: boolean
  exceptionType: exceptionType
}

export enum exceptionType {
  WARN = 'WARN',
  ERROR = 'ERROR',
}