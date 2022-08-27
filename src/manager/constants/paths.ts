import path from "path";

export const userProjectPath = process.cwd();

export const cliPath = path.resolve(
  __dirname.substring(__dirname.indexOf('/') + 1),
  '..\\..\\..\\build'
);

export const userProjectDirectory = {
  component: `${userProjectPath}\\src\\components\\`
}

export const cliTemplatePath = {
  component: `${cliPath}\\builder\\templates\\JavaScript\\component\\StyleSheet`
}

