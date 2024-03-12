import EventEmitter from 'events';
import { EventBroker, EventHandler } from './common';

export class Broker implements EventBroker {
    private emitter: EventEmitter;

    constructor(emitter = new EventEmitter()) {
        this.emitter = emitter;
    }

    publish<T>(topic: string, message: T) {
        this.emitter.emit(topic, message);
    }

    subscribe<T>(topic: string, handler: EventHandler<T>) {
        this.emitter.on(topic, handler);
    }
}
