import { PocketDOM } from '../core/client/dom';
import { PC } from '../core/files/component';
import { UserService } from '../shared/services/userService';

@PC({
  selector: 'app-users',
  template: `
  <section class="flex flex-col gap-2 p-4 border border-red-500 bg-red-200/30 rounded">
    <app-nested></app-nested>
    <button 
        id="fetch" 
        class="font-semibold px-4 w-fit mx-auto py-2 border-b-2 border-red-600 bg-red-500 rounded-md text-white hover:scale-105 transition-all duration-200 ease-in-out"
      >
        Fetch Users
      </button>
    <div id="users-container" class="text-center font-semibold"></div>
  </section>
  `,
})
export class UsersComponent {
  constructor(private userService: UserService) {
    PocketDOM.init().then((PD) => {
      PD.addEvent('#fetch', 'click', () => {
        this.userService.getUsers().subscribe({
          next: (data) => {
            PocketDOM.init().then((PD) => {
              PD.query('#users-container').innerText =
                'This data is from: http://localhost:3000/users';
              PD.forLoop(data.slice(0, 5), '#users-container', 'name');
            });
          },
          error: () => {
            window.alert('Make sure to start your server!');
          },
        });
      });
    });
  }
}
