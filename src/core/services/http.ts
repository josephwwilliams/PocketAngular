import { PI } from '../files/injectable';
import { Observable } from '../reactive/observable';

@PI({
  providedIn: 'root',
})
export class PocketClient {
  get<T>(url: string): Observable<T> {
    return new Observable<T>((observer) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          // @ts-ignore
          observer.complete();
        })
        // @ts-ignore
        .catch((error) => observer.error(error));
    });
  }

  post<T>(url: string, data: any): Observable<T> {
    return new Observable<T>((observer) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          // @ts-ignore
          observer.complete();
        })
        // @ts-ignore
        .catch((error) => observer.error(error));
    });
  }
}
