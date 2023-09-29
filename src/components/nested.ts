import { PC } from '../core/files/component';

@PC({
  selector: 'app-nested',
  template: `
    <section class="p-4 border border-blue-500 bg-blue-200/30 rounded text-center">
      <h1 >I'm nested in app-users!</h1>
    </section>
  `,
})
export class NestedComponent {}
