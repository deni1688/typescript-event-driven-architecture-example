import express from 'express';
import { Broker } from './Broker.js';
import { UserService } from './UserService.js';
import { NotificationService } from './NotificationService.js';
import { UserController } from './UserController.js';

function main() {
  const app = express();
  app.use(express.json());

  const broker = new Broker();
  new NotificationService(broker);
  const userService = new UserService(broker);
  new UserController(app, userService);

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

main();
