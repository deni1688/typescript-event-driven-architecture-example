
export interface EventHandler<T> {
    (message: T): void;
}

export interface EventBroker {
    subscribe<T>(event: string, handler: EventHandler<T>): void;
    publish<T>(event: string, message: T): void;
}

