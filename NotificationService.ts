import { User } from "./UserService";
import { EventBroker } from "./common";

export class NotificationService {
    private broker: EventBroker;

    constructor(broker: EventBroker) {
        this.broker = broker;

        this.broker.subscribe('user.created', this.sendWelcomeEmail);
        this.broker.subscribe('user.duplicateEmailSignupAttempted', this.sendUserExistsEmail);
    }

    private sendWelcomeEmail(user: User) {
        console.log(`Sending welcome email to ${user.email}`);
    }

    private sendUserExistsEmail(email: string) {
        console.log(`Sending user exists email to ${email}`);
    }
}
