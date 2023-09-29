export class Injector {
  private _container = new Map();

  constructor(private _providers: any[] = []) {
    this._providers.forEach((service) => {
      this._container.set(service, this.resolve(service));
    });
  }

  private resolve<T>(service: { new (...args: any[]): T }): T {
    const dependencies = (service.prototype.dependencies || []).map(
      (dep: any) => {
        if (this._container.has(dep)) {
          return this._container.get(dep);
        }
        return this.resolve(dep);
      },
    );
    return new service(...dependencies);
  }

  get<T>(service: { new (...args: any[]): T }): T {
    const serviceInstance = this._container.get(service);
    if (!serviceInstance) {
      throw new Error('No Provider Found!');
    }
    return serviceInstance;
  }
}
