import EventEmitter from 'events';

export class Broker {
    constructor(emitter = new EventEmitter()) {
        this.emitter = emitter;
    }

    publish(topic, message) {
        this.emitter.emit(topic, message);
    }

    subscribe(topic, listener) {
        this.emitter.on(topic, listener);
    }
}