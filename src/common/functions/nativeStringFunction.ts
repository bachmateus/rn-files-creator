export class NativeStringFunction {
  static escapeRegExp(string:string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  
  static replaceAll(str:string, find:string, replace:string) {
    return str.replace(new RegExp(NativeStringFunction.escapeRegExp(find), 'g'), replace);
  }
}