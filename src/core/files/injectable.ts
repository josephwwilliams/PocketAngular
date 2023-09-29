interface PocketInjectable {
  providedIn: string;
  dependencies?: any[];
}

export function PI(pocketInjectable: PocketInjectable) {
  return function (constructor: Function) {
    constructor.prototype.providedIn = pocketInjectable.providedIn;
    constructor.prototype.dependencies = pocketInjectable.dependencies || [];
  };
}
