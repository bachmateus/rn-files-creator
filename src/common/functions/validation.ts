export const validateComponentName = (userInput:any) => {
  if (userInput.length === 0) return false
  if (typeof userInput === 'number') return false

  const startsWithNumberRegex = /^[A-z]/; 
  if (!startsWithNumberRegex.test(userInput)) return false

  return true
}