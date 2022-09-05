export function createCommandsArgs(commandLine: string) {
  const defaultArgsPrompt = [
    'C:\\Program Files\\nodejs\\node.exe',
    'C:\\Users\\bacha\\AppData\\Roaming\\npm\\node_modules\\@bachmateus\\rn-files-creator\\bin\\rn',
  ];
  const argCommand = commandLine.split(' ');
  argCommand.shift();
  return [...defaultArgsPrompt, ...argCommand]
}