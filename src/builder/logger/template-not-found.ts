export class TemplateNotFoundError extends Error{
  constructor(msg: string){
    super (msg);
  }
}