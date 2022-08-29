import { validateComponentName } from "./validation";
describe('Test validateComponentName', () => {
  it('should return false if input is empty', () => {
    expect(validateComponentName('')).toBeFalsy();
  });
  it('should return false if input starts with number', () => {
    expect(validateComponentName('1Test')).toBeFalsy();
  });
  it('should return false if input starts with special caracter', () => {
    expect(validateComponentName('!1Test')).toBeFalsy();
  });
  it('should return true if input starts with letter', () => {
    expect(validateComponentName('Test')).toBeTruthy();
  });
})