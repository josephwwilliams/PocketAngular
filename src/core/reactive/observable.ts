interface Observer<T> {
  next: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}

export class Observable<T> {
  private _subscribers: Observer<T>[] = [];
  private _isComplete = false;

  constructor(private _subscribe?: (observer: Observer<T>) => void) {}

  subscribe(observer: Observer<T>) {
    if (this._isComplete) return () => {};
    this._subscribers.push(observer);
    if (this._subscribe) {
      this._subscribe({
        next: (value: T) => this.next(value),
        error: (err: any) => this.error(err),
        complete: () => this.complete(),
      });
    }
    return () => {
      const index = this._subscribers.indexOf(observer);
      if (index !== -1) this._subscribers.splice(index, 1);
    };
  }

  next(value: T) {
    for (const subscriber of this._subscribers) {
      subscriber.next(value);
    }
  }

  error(err: any) {
    for (const subscriber of this._subscribers) {
      subscriber.error?.(err);
    }
    this._isComplete = true;
  }

  complete() {
    for (const subscriber of this._subscribers) {
      subscriber.complete?.();
    }
    this._isComplete = true;
  }
}
