# rn-files-creator
[![Version](https://img.shields.io/npm/v/@bachmateus/rn-files-creator.svg)](https://www.npmjs.com/package/@bachmateus/rn-files-creator)

`rn-files-creator` make easier to create new React Native components files. It provides a basic file structure for your components with StyleSheet or StyledComponent.

![](logo.png)

# CAUTION
This project is stil on development due to DO NOT use it on a production project.

# How to install
You can install via npm:

  ```bash
  npm i -g @bachmateus/rn-files-creator
  ```

# Features
Create React Native files.

1. Create components files using JavaScript.
2. Create components files using TypeScript.
3. Create style file using StyleSheet.
4. Create style file using StyledComponent.
5. Create a config file to store your preferences.

# Project folders structure
`rn-files-creator` use the following project structure to create the components.

  ```bash
  root
  +-- src
      +-- components
          +-- ComponentName
              +-- index.js
              +-- styles.js
      +-- screens
          +-- ScreenName
              +-- index.js
              +-- styles.js
  +-- rn-creator1.json
  ```


# Usage
The basic use of rn-file-creator is  :
  ```bash
  rn -command componentName [otherComponentName]
  ```

## Creating a Component
Type the following command to create a component 

  ```bash
  rn -c ComponentName
  ```
If you want to create more than one component, you can separe the components name using space

  ```bash
  rn -c ComponentName1 ComponentName2 ComponentName3 ComponentName4
  ```

## Creating a Screen
Type the following command to create a screen 

  ```bash
  rn -s ScreenName
  ```
If you want to create more than one screen, you can separe the screens name using space

  ```bash
  rn -s ScreenName1 ScreenName2 ScreenName3 ScreenName4
  ```

## Creating guide
You can follow the guide to create a component if you do not want to type the entire command.

  ```bash
  rn
  ```

After typping enter just follow the guide.


# Command list

| Comand          | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| -c, component   | Create one or more components                                 |
| -h, help        | Show possible commands                                        |
| -s, screen      | Create one or more screens                                    |


### Known issues
1. It do not work on MacOS.
2. It has not been tested on Linux

# Inspiration
I want to thanks DOMINIK KUNDEL. I watched his video to learn how to create a CLI.

https://www.youtube.com/watch?v=s2h28p4s-Xs
https://www.twilio.com/blog/how-to-build-a-cli-with-node-js?utm_source=youtube&utm_medium=video&utm_campaign=node-cli-howto