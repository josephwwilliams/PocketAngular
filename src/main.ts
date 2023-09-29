import { PocketModule } from './core/files/module';
import { Injector } from './core/injector/injector';
import { AppModule } from './module';
import { UserService } from './shared/services/userService';

const module = new AppModule() as PocketModule;
const injector = new Injector([...(module.providers || [])]);

const app = document.querySelector('app-root');
if (app) {
  const components = module.declarations;
  const appComponent = components.find(
    (c) => c.prototype.selector === 'app-root',
  );
  if (appComponent) {
    let instance = new appComponent();
    const processedTemplate = processTemplate(instance.template, instance);
    app.innerHTML = processedTemplate;

    buildNestedComponents(app, components);
  }
}

function buildNestedComponents(root: Element, components: any[]) {
  components.forEach((component) => {
    const nodes = Array.from(
      root.querySelectorAll(component.prototype.selector),
    );
    nodes.forEach((node) => {
      const componentInstance = new component(injector.get(UserService));
      const processedTemplate = processTemplate(
        componentInstance.template,
        componentInstance,
      );
      node.innerHTML = processedTemplate;

      if (componentInstance.styles) {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = componentInstance.styles;
        node.appendChild(styleElement);
      }

      buildNestedComponents(node, components);
    });
  });
}

export function processTemplate(template: string, componentInstance: any) {
  let processedTemplate = template;

  const expressionRegex = /{{([^}]+)}}/g;
  processedTemplate = processedTemplate.replace(
    expressionRegex,
    (_, expression) => {
      const keys = expression.trim().split('.');
      let value = componentInstance;
      keys.forEach((key: string | number) => {
        value = value[key];
      });
      return value !== undefined ? value : '';
    },
  );

  return processedTemplate;
}
