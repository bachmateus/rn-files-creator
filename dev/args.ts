export const defaultArgsPrompt = [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\bacha\\AppData\\Roaming\\npm\\node_modules\\@bachmateus\\rn-files-creator\\bin\\rn',
];

const commands = {
  empty: "rn",
  createComponent: "rn -c Component1 -c Component2",
  createComponentShort: "rn --screen A4 --component A4",
  createRoute: "rn -r RecipeRoutes -t bottomTab",
  // createRoute: "rn -r Login -r Logged -t stack -i MainRoute -aaps",
  // createRoute: "rn -r Login -r Logged -t stack -i MainRoute -aaps",
  // createRouteShort: "rn -c Component1",
}

const argCommand = commands.createRoute.split(' ');
// const argCommand = commands.createComponent.split(' ');
// const argCommand = commands.empty.split(' ');
// const argCommand = commands.createRoute.split(' ');
argCommand.shift();

export const args = [...defaultArgsPrompt, ...argCommand];