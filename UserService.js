import { randomUUID } from "crypto";

export class UserService {
    constructor(broker) {
        this.broker = broker;
        this.db = new Map();
    }

    createUser(name, email) {
        new Promise(resolve => {
            // some long running account creation process that the user cannot wait for
            setTimeout(() => {
                if (Array.from(this.db.values()).some(user => user.email === email)) {
                    this.broker.publish('user.exists', email);
                    resolve(null);
                    return;
                }

                const user = {
                    id: randomUUID(),
                    name,
                    email
                };

                this.db.set(user.id, user);
                this.broker.publish('user.created', user);
                resolve(user.id);
            }, 10_000);
        })

        return 'User creation process started. You will receive an email once the account is created.';
    }

    getUsers() {
        return Array.from(this.db.values());
    }

    getUserById(id) {
        return this.db.get(id);
    }
}
