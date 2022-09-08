export const defaultArgsPrompt = [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\bacha\\AppData\\Roaming\\npm\\node_modules\\@bachmateus\\rn-files-creator\\bin\\rn',
];

const commands = {
  empty: "rn",
  createComponent: "rn -c Component1 -i Login -h",
  createComponentShort: "rn --screen A4 --component A4",
  createNavigator: "rn -n Login -n Logged -t stack -i MainNavigator -aaps",
  // createNavigatorShort: "rn -c Component1",
}

const argCommand = commands.createComponentShort.split(' ');
// const argCommand = commands.createComponent.split(' ');
// const argCommand = commands.empty.split(' ');
// const argCommand = commands.createNavigator.split(' ');
argCommand.shift();

export const args = [...defaultArgsPrompt, ...argCommand];