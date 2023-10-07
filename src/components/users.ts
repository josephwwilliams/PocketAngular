import { PocketDOM } from '../core/client/dom';
import { PC } from '../core/files/component';
import { UserService } from '../shared/services/userService';

@PC({
  selector: 'app-users',
  template: `
  <section class="flex flex-col gap-2 p-4 border border-red-500 bg-red-200/30 rounded">
    <app-nested></app-nested>
    <div id="users-container" class="text-center"></div>
  </section>
  `,
})
export class UsersComponent {
  constructor(private userService: UserService) {
    PocketDOM.init().then((PD) => {
      PD.query('#users-container').innerText =
        'Loading from API... with fake delay...';
    });

    this.userService.getUsers().subscribe({
      next: (data) => {
        PocketDOM.init().then((PD) => {
          setTimeout(() => {
            PD.query('#users-container').innerText =
              'This data is from: https://dummyjson.com/users';
            PD.forLoop(data.users.slice(0, 5), '#users-container', 'firstName');
          }, 2000);
        });
      },
    });
  }
}
