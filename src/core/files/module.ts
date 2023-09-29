export interface PocketModule {
  declarations: any[];
  providers?: any[];
}

export function PM(pocketModule: PocketModule) {
  return function (constructor: Function) {
    constructor.prototype.declarations = pocketModule.declarations;
    constructor.prototype.providers = pocketModule.providers;
  };
}
