import { PocketDOM } from '../core/client/dom';
import { PC } from '../core/files/component';

@PC({
  selector: 'app-counter',
  template: `
  <section class="p-4 border border-green-500 bg-green-200/30 rounded">
      <button 
        id="click" 
        class="font-semibold px-4 py-2 border-b-2 border-green-600 bg-green-500 rounded-md text-white hover:scale-105 transition-all duration-200 ease-in-out"
      >
      Count: {{count}}
      </button>
    </section>
  `,
})
export class CounterComponent {
  public count = 0;

  constructor() {
    PocketDOM.init().then((PD) => {
      PD.addEvent('app-root', 'click', (event: Event) => {
        if ((event.target as Element).id === 'click') {
          this.count++;
          // @ts-ignore
          this.render(this);
        }
      });
    });
  }
}
