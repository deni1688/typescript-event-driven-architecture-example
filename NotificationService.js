export class NotificationService {

    constructor(broker) {
        this.broker = broker;

        this.broker.subscribe('user.created', this.sendWelcomeEmail);
        this.broker.subscribe('user.exists', this.sendUserExistsEmail);
    }

    sendWelcomeEmail(user) {
        console.log(`Sending welcome email to ${user.email}`);
    }

    sendUserExistsEmail(email) {
        console.log(`Sending user exists email to ${email}`);
    }
}
