export interface EventBroker {
    subscribe(event: string, listener: (message: unknown) => void): void;
    publish(event: string, message: unknown): void;
}

