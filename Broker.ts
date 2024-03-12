import EventEmitter from 'events';
import { EventBroker } from './common';

export class Broker implements EventBroker {
    private emitter: EventEmitter;

    constructor(emitter = new EventEmitter()) {
        this.emitter = emitter;
    }

    publish(topic: string, message: unknown) {
        this.emitter.emit(topic, message);
    }

    subscribe(topic: string, listener: (message: unknown) => void) {
        this.emitter.on(topic, listener);
    }
}
