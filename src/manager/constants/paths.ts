import path from "path";

export const userProjectPath = process.env.NODE_ENVIRONMENT ? `${process.cwd()}\\test\\target-dir` : process.cwd();

export const cliPath = path.resolve(
  __dirname.substring(__dirname.indexOf('/') + 1),
  '..\\..\\..\\build'
);

export const userProjectDirectory = {
  component: `${userProjectPath}\\src\\components\\`,
  screen: `${userProjectPath}\\src\\screens\\`
}

export const cliTemplatePath = {
  component: `${cliPath}\\builder\\templates\\component`,
  screen: `${cliPath}\\builder\\templates\\component`
}

