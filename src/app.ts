import { PC } from './core/files/component';

@PC({
  selector: 'app-root',
  template: `
  <main class="flex h-screen justify-center items-center flex-col gap-2 ">
    <div class="flex gap-5">
      <app-counter></app-counter>
      <app-post></app-post>
    </div>
    <app-users></app-users>
  </main>
  `,
})
export class App {}
