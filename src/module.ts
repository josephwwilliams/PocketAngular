import { App } from './app';
import { CounterComponent } from './components/counter';
import { NestedComponent } from './components/nested';
import { UsersComponent } from './components/users';
import { PM } from './core/files/module';
import { UserService } from './shared/services/userService';

@PM({
  declarations: [App, UsersComponent, CounterComponent, NestedComponent],
  providers: [UserService],
})
export class AppModule {}
