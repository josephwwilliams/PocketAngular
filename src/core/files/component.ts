import { processTemplate } from '../../main';

interface PocketComponent {
  selector: string;
  template: string;
}

export function PC(pocketComponent: PocketComponent) {
  return function (constructor: Function) {
    constructor.prototype.selector = pocketComponent.selector;
    constructor.prototype.template = pocketComponent.template;
    constructor.prototype.render = (instance: any): void => {
      const renderedTemplate = processTemplate(instance.template, instance);
      document.querySelector(instance.selector).innerHTML = renderedTemplate;
    };
  };
}
