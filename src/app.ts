import { PC } from './core/files/component';

@PC({
  selector: 'app-root',
  template: `
  <main class="flex h-screen justify-center items-center flex-col gap-2 ">
    <app-counter></app-counter>
    <app-users></app-users>
  </main>
  `,
})
export class App {}
