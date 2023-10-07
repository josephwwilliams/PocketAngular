import { PocketDOM } from '../core/client/dom';
import { PC } from '../core/files/component';
import { UserService } from '../shared/services/userService';

@PC({
  selector: 'app-post',
  template: `
    <section class="p-4 border border-purple-500 bg-purple-200/30 rounded text-center">
      <button 
        id="post" 
        class="font-semibold px-4 w-fit mx-auto py-2 border-b-2 border-purple-600 bg-purple-500 rounded-md text-white hover:scale-105 transition-all duration-200 ease-in-out"
      >
        Send Post Request!
      </button>
    </section>
  `,
})
export class PostComponent {
  constructor(private userService: UserService) {
    PocketDOM.init().then((PD) => {
      PD.addEvent('#post', 'click', () => {
        this.userService
          .createUser({
            name: 'Jerry',
          })
          .subscribe({
            next: (data) => {
              window.alert(
                `User ${data.name} with an id of ${data.id} created!`,
              );
            },
            error: () => {
              window.alert('Make sure to start your server!');
            },
          });
      });
    });
  }
}
