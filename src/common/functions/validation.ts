export const validateComponentName = (userInput:any) => {
  if (typeof userInput === 'number') return false

  const startsWithNumberRegex = /^\d/; 
  if (startsWithNumberRegex.test(userInput)) return false

  return true
}