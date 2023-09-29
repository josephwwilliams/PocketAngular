import { PI } from '../../core/files/injectable';
import { Observable } from '../../core/reactive/observable';
import { PocketClient } from '../../core/services/http';

export interface User {
  id: number;
  name: { first: string; last: string };
}

export interface APIUser {
  id: number;
  firstName: string;
}

@PI({
  providedIn: 'root',
  dependencies: [PocketClient],
})
export class UserService {
  constructor(private http: PocketClient) {}

  private _users: User[] = [];
  private _usersSubject = new Observable<User[]>((observer) => {
    observer.next(this._users);
  });

  get usersObservable() {
    return this._usersSubject;
  }

  addUser(user: User) {
    this._users.push(user);
    this._usersSubject.next(this._users);
  }

  removeUser(user: User) {
    const index = this._users.indexOf(user);
    if (index > -1) {
      this._users.splice(index, 1);
      this._usersSubject.next(this._users);
    }
  }

  getUsers() {
    return this.http.get<APIUser[]>('https://dummyjson.com/users');
  }
}
