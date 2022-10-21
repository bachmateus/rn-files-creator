export const routeWordsToRename = {
  // TODO: change interface to use routesTypesEnum 
  routeFile: {
    routeNameToRename: 'MyRoutes',
    library: {
      stack: [
        { find: 'ROUTE_CREATOR', replaceTo: 'createNativeStackNavigator' },
        { find: 'ROUTE_LIB', replaceTo: '@react-navigation/native-stack' },
      ],
      bottomTab: [
        { find: 'ROUTE_CREATOR', replaceTo: 'createBottomTabNavigator' },
        { find: 'ROUTE_LIB', replaceTo: '@react-navigation/bottom-tabs' },
      ],
      drawer: [
        { find: 'ROUTE_CREATOR', replaceTo: 'createDrawerNavigator' },
        { find: 'ROUTE_LIB', replaceTo: '@react-navigation/drawer' },
      ],
    },
  }
}

export const routeFileToCopy = {
  JavaScript:(routeName:string) => ({
    routeName, templateFileName: 'routes.js', fileName: `${generateRouteNameFile(routeName)}.js`
  }),
  TypeScript:(routeName:string) => ({
    routeName, templateFileName: 'routes.js', fileName: `${generateRouteNameFile(routeName)}.tsx`
  }),
}

export const mainRouteFileName = {
  JavaScript: { templateFileName: 'main.routes.js', fileName: 'index.js'},
  TypeScript: { templateFileName: 'main.routes.js', fileName: 'index.tsx'},
};

export const generateRouteNameFile = (componentRouteName:string) => {
  const routeName = componentRouteName.replace('Routes', '').replace('-routes', '');
  if (routeName.length === 0) return componentRouteName.toLocaleLowerCase();
  const lowercaseName = routeName
    .split('')
    .map(char => {
      if(char === char.toUpperCase()) return `-${char.toLocaleLowerCase()}`;
      return char;
    })
    .join('')
    .replace('-', '');
  return `${lowercaseName}.routes`.toLocaleLowerCase();
}

export const getRouteNameByFileName = (fileName:string): string => {
  const fileNameWithouExtension = fileName.replace('.tsx', '').replace('.js', '');
  return fileNameWithouExtension
    .split('-')
    .map(word=>word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
    .replace('.routes', 'Routes');
}

export const generateImportCodeLine = (routeName: string): string => `import ${routeName.split('.')[0]} from './${generateRouteNameFile(routeName)}'`;

export const generateJsxCodeLine = (routeName: string, isMainRoute: boolean): string => isMainRoute ? `      <${routeName} />` : `      <Screen name="${routeName}" component={${routeName}} />` ;

export const getMainRoutePathAndTagReference = (mainRouteName: string) => {
  return {
    importTermToFind: 'import',
    nestedRouteTagReference: (!mainRouteName) ? '<NavigationContainer' : '<Navigator',
  }
}