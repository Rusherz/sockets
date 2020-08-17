import App from './app';
import UserController from './controllers/users';
 
const app = new App(
  [
    new UserController(),
  ],
  5000,
);
 
app.listen();