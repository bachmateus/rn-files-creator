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
    routeName, templateFileName: 'routes.js', fileName: `${routeNameFile(routeName)}.js`
  }),
  TypeScript:(routeName:string) => ({
    routeName, templateFileName: 'routes.js', fileName: `${routeNameFile(routeName)}.tsx`
  }),
}

const routeNameFile = (componentRouteName:string) => {
  const routeName = componentRouteName.replace('Routes', '');
  if (routeName.length === 0) return componentRouteName.toLocaleLowerCase();
  return `${routeName}.routes`.toLocaleLowerCase();
}