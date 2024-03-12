import { randomUUID } from "crypto";
import { EventBroker } from "./common";

export type UserId = string;
export type User = {
    id: UserId;
    name: string;
    email: string;
};

export interface UserService {
    createUser(name: string, email: string): string;
    getUsers(): User[];
    getUserById(id: UserId): User | undefined;
};

export class UserServiceImpl implements UserService {
    private broker: EventBroker;
    private db: Map<UserId, { id: UserId, name: string, email: string }>;

    constructor(broker: EventBroker) {
        this.broker = broker;
        this.db = new Map();
    }

    createUser(name: string, email: string): string {
        new Promise(resolve => {
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
            }, 10_000); // simulate a long running process
        })

        return 'User creation process started. You will receive an email once the account is created.';
    }

    getUsers(): User[] {
        return Array.from(this.db.values());
    }

    getUserById(id: UserId): User | undefined {
        return this.db.get(id);
    }
}
