import { Events } from "./Events.js";

class EventBus {
  /** @member {Map<String, Function>} */
  #actors;

  constructor() {
    this.#actors = new Map(Object.values(Events).map((event) => [event, new Set()]));
  }

  /**
   * @param {String} event - name of the event.
   * @param {Function} actor - actor on the event.
   */
  subscribe(event, actor) {
    this.#actors.get(event).add(actor);
  }

  /**
   * @param {String} event - name of the event.
   * @param {Function} actor - actor on the event.
   */
  unsubscribe(event, actor) {
    this.#actors.get(event).delete(actor);
  }

  /**
   * @param {String} event - name of the event.
   * @param {Object?} args - optional args for the actor.
   */
  emit(event, args = null) {
    this.#actors.get(event).forEach((actor) => {
      actor(args);
    });
  }
}

const callbacksBus = new EventBus();
export { callbacksBus as CallbackBus };

const fallbacksBus = new EventBus();
export { fallbacksBus as FallbackBus };
