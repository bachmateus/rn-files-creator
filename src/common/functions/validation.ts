export const validateComponentName = (userInput:any) => {
  if (userInput.length === 0) return false
  if (typeof userInput === 'number') return false

  const startsWithNumberRegex = /^[A-z]/; 
  if (!startsWithNumberRegex.test(userInput)) return false

  return true
}

export const formatComponentName = (componentName:string): string => {
  const splitedName = componentName.split('-');
  const compositeName = splitedName.reduce( (response, name) => response + name.substring(0,1).toUpperCase() + name.substring(1), '');
  return compositeName
}

export const formatComponentsNames = (componentsNames: string[]): string[] => {
  return componentsNames.map(formatComponentName)
}