import path from "path";

export const userProjectPath = process.env.NODE_ENVIRONMENT ? `${process.cwd()}\/test\/target-dir` : process.cwd()

export const cliPath = path.resolve(
  __dirname.substring(__dirname.indexOf('\/') + 1),
  process.env.NODE_ENVIRONMENT ? '..\/..\/..\/src' : '..\/..\/..\/build'
).replace(process.cwd(), '');

export const userProjectDirectory = {
  component: `${userProjectPath}\/src\/components\/`,
  screen: `${userProjectPath}\/src\/screens\/`,
  route: `${userProjectPath}\/src\/routes\/`,
  packageJson: `${userProjectPath}\/package.json`
}

export const cliTemplatePath = {
  component: `${cliPath}\/builder\/templates\/component`,
  screen: `${cliPath}\/builder\/templates\/component`,
  route: `${cliPath}\/builder\/templates\/routes`,
}

export const txtHelpFile = `${cliPath}\/cli\/assets\/help-text.txt`