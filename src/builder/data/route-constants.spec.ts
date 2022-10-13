import { generateRouteNameFile, getRouteNameByFileName } from './route-constants';

describe('route-words-rename', () => {
  describe('generateRouteNameFile', () => {
    it('success to generate component file name composed by one word', () => {
      const componentName = 'LoggedRoutes';
      const fileName = 'logged.routes';
      expect(generateRouteNameFile(componentName)).toEqual(fileName);
    });
    it('success to generate component file name composed by more than one word', () => {
      const componentName = 'UserLoggedRoutes';
      const fileName = 'user-logged.routes';
      expect(generateRouteNameFile(componentName)).toEqual(fileName);
    });
    it('success to generate component file name composed by lowercase words', () => {
      const componentName = 'user-logged-routes';
      const fileName = 'user-logged.routes';
      expect(generateRouteNameFile(componentName)).toEqual(fileName);
    });
  })

  describe('getRouteNameByFileName', () => {
    it('success to get component name composed by one word', () => {
      const fileName = 'logged.routes.js';
      const componentName = 'LoggedRoutes';
      expect(getRouteNameByFileName(fileName)).toEqual(componentName);
    });
    it('success to get component name composed by more than one word', () => {
      const fileName = 'user-logged.routes.js';
      const componentName = 'UserLoggedRoutes';
      expect(getRouteNameByFileName(fileName)).toEqual(componentName);
    });
  })
});