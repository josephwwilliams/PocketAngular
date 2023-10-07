import { App } from './app';
import { CounterComponent } from './components/counter';
import { NestedComponent } from './components/nested';
import { PostComponent } from './components/post';
import { UsersComponent } from './components/users';
import { PM } from './core/files/module';
import { UserService } from './shared/services/userService';

@PM({
  declarations: [
    App,
    UsersComponent,
    CounterComponent,
    NestedComponent,
    PostComponent,
  ],
  providers: [UserService],
})
export class AppModule {}
