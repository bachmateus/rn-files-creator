import Component from "./Component.builder";

export default class Screen {
  component = null;
  
  constructor(_options) {
    _options.templateDir = _options.templateDir.replace('screen','component');
    this.component = new Component(_options);
  }

  async createComponent() {
    this.component.createComponent();
  }

}