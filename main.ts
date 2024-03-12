import express, { Application } from 'express';

import { Broker } from './Broker';
import { UserServiceImpl } from './UserService';
import { NotificationService } from './NotificationService';
import { UserController } from './UserController';

function main(app: Application): void {
    app.use(express.json());

    const broker = new Broker();
    const userService = new UserServiceImpl(broker);
    new NotificationService(broker);
    new UserController(app, userService);

    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000/');
    });
}

main(express());
