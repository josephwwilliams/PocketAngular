export class PocketDOM {
  constructor(domLoaded: boolean) {
    if (!domLoaded) {
      throw new Error('Cannot be called directly');
    }
  }

  query(selector: string) {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) {
      throw new Error('Failed to find element');
    }
    return element;
  }

  style(selector: string, styles: Record<string, string>) {
    const element = this.query(selector);

    Object.keys(styles).forEach((styleKey) => {
      (element.style as any)[styleKey] = styles[styleKey];
    });
  }

  forLoop(items: any[], selector: string, attibute?: string) {
    const element = this.query(selector);
    const ul = document.createElement('ul');
    items.forEach((item) => {
      const li = document.createElement('li');
      li.innerText = attibute ? item[attibute] : item;
      ul.appendChild(li);
    });
    element.appendChild(ul);
  }

  addEvent(selector: string, event: string, fn: Function) {
    return this.query(selector).addEventListener(event, (e) => {
      return fn(e);
    });
  }

  static init(): Promise<PocketDOM> {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () =>
          resolve(new PocketDOM(true)),
        );
      } else {
        resolve(new PocketDOM(true));
      }
    });
  }
}
