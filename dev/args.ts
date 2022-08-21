export const defaultArgsPrompt = [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\bacha\\AppData\\Roaming\\npm\\node_modules\\@bachmateus\\rn-files-creator\\bin\\rn',
];

const commands = {
  createComponent: "rn -h -c Component1 -i Login -oo",
  createComponentShort: "rn -c Component1",
  createNavigator: "rn -n Login -n Logged -t stack -i MainNavigator -aaps",
  // createNavigatorShort: "rn -c Component1",
}

const argCommand = commands.createComponent.split(' ');
// const argCommand = commands.createNavigator.split(' ');
argCommand.shift();

export const args = [...defaultArgsPrompt, ...argCommand];