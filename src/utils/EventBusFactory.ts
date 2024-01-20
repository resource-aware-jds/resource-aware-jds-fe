import mitt, { Emitter } from "mitt";

enum Event {
  Signin,
  Signoff,
  LocaleConfigUpdate,
}

class EventBusFactory {
  private static _instance: EventBusFactory;
  private _eventBus: Emitter<any>;

  private constructor() {
    this._eventBus = mitt();
  }

  public get eventBus(): Emitter<any> {
    return this._eventBus;
  }

  public static get instance(): EventBusFactory {
    if (!this._instance) {
      this._instance = new EventBusFactory();
    }
    return this._instance;
  }
}

export default EventBusFactory;
export { Event };
