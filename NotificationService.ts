import { User } from "./UserService";
import { EventBroker } from "./common";

export class NotificationService {
    private broker: EventBroker;

    constructor(broker: EventBroker) {
        this.broker = broker;

        this.broker.subscribe('user.created', this.sendWelcomeEmail as (message: unknown) => void);
        this.broker.subscribe('user.exists', this.sendUserExistsEmail as (message: unknown) => void);
    }

    sendWelcomeEmail(user: User) {
        console.log(`Sending welcome email to ${user.email}`);
    }

    sendUserExistsEmail(email: string) {
        console.log(`Sending user exists email to ${email}`);
    }
}